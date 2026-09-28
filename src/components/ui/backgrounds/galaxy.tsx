"use client";

/**
 * Galaxy — vendored from React Bits (registry item `Galaxy-TS-CSS`,
 * https://reactbits.dev/r/Galaxy-TS-CSS.json; licence terms: see
 * github.com/DavidHDev/react-bits). The shaders are upstream except for
 * one addition, marked "Birthwave tint mode" in the fragment shader.
 *
 * Brought in by hand rather than `npx shadcn add`: this project has no
 * shadcn setup, and `shadcn init` would rewrite globals.css (theme
 * variables, tw-animate import) and add a `cn`/utils layer that conflicts
 * with the existing token system.
 *
 * Local changes to the component (everything outside the shaders):
 *  1. Stable effect dependencies — upstream's `focal`/`rotation` array
 *     defaults are new every render, which tore down and re-created the
 *     WebGL context on every parent re-render. The effect now depends on
 *     their numeric values.
 *  2. Pauses its rAF loop while off-screen (IntersectionObserver).
 *  3. A static mode: with `disableAnimation` and no mouse interaction it
 *     renders once (and on resize) instead of every frame — used for
 *     prefers-reduced-motion.
 *  4. Upstream's `.galaxy-container` global stylesheet (width/height 100%,
 *     position relative) is replaced with equivalent Tailwind classes.
 *  5. The container resize uses a ResizeObserver (upstream: window resize
 *     only), so it also tracks section-height changes.
 *  6. Tint mode (`tint` prop). Upstream's transparent mode emits light —
 *     it reads on dark backgrounds but on a light surface the star cores
 *     go white (invisible on ivory) and dim halos go muddy. Tint mode keeps
 *     the star field, drift and twinkle, but paints each glow in a fixed
 *     colour with alpha from the star's energy: a warm colour (optionally
 *     leaning to a second warm tone for red-leaning stars), or — for stars
 *     whose shifted hue lands blue-dominant — an occasional cool one.
 *     `hueShift`/`saturation` then decide how many stars read as cool.
 *     Tint mode also damps the flare rays of the largest stars, so glows
 *     stay round rather than reading as starbursts.
 *  7. Fails quietly (renders nothing) if WebGL can't be created.
 *
 * Use through <BirthwaveGalaxy> (birthwave-galaxy.tsx), not directly.
 */

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

let webglSupport: boolean | null = null;
function supportsWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    webglSupport = Boolean(gl);
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform float uLightMode;
uniform float uTintMode;
uniform vec3 uTintWarm;
uniform vec3 uTintWarmAlt;
uniform float uTintWarmAltAmount;
uniform vec3 uTintCool;
uniform float uTintCoolAmount;
uniform float uTintOpacity;
uniform float uTintFloor;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;
      // Birthwave tint mode: keep large glows round — no cross-shaped flare rays.
      flareSize *= 1.0 - 0.85 * uTintMode;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  // Birthwave tint mode: brand-coloured glow with energy-driven alpha,
  // for light surfaces (see the header comment, item 6).
  if (uTintMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coolness = smoothstep(0.05, 0.35, col.b - col.r) * uTintCoolAmount;
    // Red-leaning stars drift toward a second warm tone.
    float warmth = smoothstep(0.05, 0.35, col.r - col.g) * uTintWarmAltAmount;
    vec3 warm = mix(uTintWarm, uTintWarmAlt, warmth);
    vec3 tint = mix(warm, uTintCool, coolness);
    float alpha = smoothstep(uTintFloor, 0.6, energy) * uTintOpacity;
    gl_FragColor = vec4(tint, alpha);
    return;
  }

  if (uLightMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coverage = clamp(smoothstep(0.0, 0.42, energy) * 0.92, 0.0, 0.92);
    vec3 ink = clamp(col * 0.48, 0.0, 0.82);
    gl_FragColor = vec4(mix(vec3(1.0), ink, coverage), 1.0);
  } else if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export interface GalaxyProps {
  focal?: [number, number];
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  lightMode?: boolean;
  /** Tint mode (for light surfaces): warm/cool glow colours as 0–1 RGB. */
  tint?: {
    warm: [number, number, number];
    /** Optional second warm tone for red-leaning stars. */
    warmAlt?: [number, number, number];
    /** 0–1: how strongly red-leaning stars take `warmAlt`. */
    warmAltAmount?: number;
    cool: [number, number, number];
    /** 0–1: how strongly blue-dominant stars take the cool colour. */
    coolAmount: number;
    /** 0–1: peak glow opacity. */
    opacity: number;
    /** 0–0.5: energy below which glow is dropped — trims the faintest micro-points. */
    floor?: number;
  };
  className?: string;
}

export default function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  lightMode = false,
  tint,
  className,
}: GalaxyProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0.0);
  const smoothMouseActive = useRef(0.0);

  // (1) Primitive values, so the effect only re-runs on a real change.
  const [focalX, focalY] = focal;
  const [rotationX, rotationY] = rotation;
  const tintOn = Boolean(tint);
  const [warmR, warmG, warmB] = tint?.warm ?? [1, 1, 1];
  const [warmAltR, warmAltG, warmAltB] = tint?.warmAlt ?? tint?.warm ?? [1, 1, 1];
  const tintWarmAltAmount = tint?.warmAltAmount ?? 0;
  const [coolR, coolG, coolB] = tint?.cool ?? [1, 1, 1];
  const tintCoolAmount = tint?.coolAmount ?? 0;
  const tintOpacity = tint?.opacity ?? 1;
  const tintFloor = tint?.floor ?? 0;

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    // (7) WebGL unavailable (blocked GPU, old device, context limit): render
    // nothing rather than throw from an effect and take the page down —
    // checked first so the fallback doesn't log a console error either.
    if (!supportsWebGL()) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: transparent,
        premultipliedAlpha: false,
      });
      if (!renderer.gl) return;
    } catch {
      return;
    }
    const gl = renderer.gl;

    if (lightMode) {
      gl.clearColor(1, 1, 1, 1);
    } else if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
        },
        uFocal: { value: new Float32Array([focalX, focalY]) },
        uRotation: { value: new Float32Array([rotationX, rotationY]) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: {
          value: new Float32Array([smoothMousePos.current.x, smoothMousePos.current.y]),
        },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent },
        uLightMode: { value: lightMode ? 1 : 0 },
        uTintMode: { value: tintOn ? 1 : 0 },
        uTintWarm: { value: new Float32Array([warmR, warmG, warmB]) },
        uTintWarmAlt: { value: new Float32Array([warmAltR, warmAltG, warmAltB]) },
        uTintWarmAltAmount: { value: tintWarmAltAmount },
        uTintCool: { value: new Float32Array([coolR, coolG, coolB]) },
        uTintCoolAmount: { value: tintCoolAmount },
        uTintOpacity: { value: tintOpacity },
        uTintFloor: { value: tintFloor },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    // (3) Nothing time- or pointer-driven to animate: draw once per change.
    const isStatic = disableAnimation && !mouseInteraction;

    function draw() {
      renderer.render({ scene: mesh });
    }

    // (5) Track the container itself, not just the window.
    function resize() {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      );
      if (isStatic) draw();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(ctn);
    resize();

    let animateId = 0;
    function update(t: number) {
      animateId = requestAnimationFrame(update);
      if (!disableAnimation) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;
      }

      const lerpFactor = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;
      smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
      program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
      program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;

      draw();
    }
    function start() {
      if (!isStatic && !animateId) animateId = requestAnimationFrame(update);
    }
    function stop() {
      cancelAnimationFrame(animateId);
      animateId = 0;
    }

    ctn.appendChild(gl.canvas);

    // (2) Only animate while the container is on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { rootMargin: "100px 0px" },
    );
    visibility.observe(ctn);
    if (isStatic) draw();

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1.0;
    }
    function handleMouseLeave() {
      targetMouseActive.current = 0.0;
    }
    if (mouseInteraction) {
      ctn.addEventListener("mousemove", handleMouseMove);
      ctn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      if (mouseInteraction) {
        ctn.removeEventListener("mousemove", handleMouseMove);
        ctn.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    focalX,
    focalY,
    rotationX,
    rotationY,
    starSpeed,
    density,
    hueShift,
    disableAnimation,
    speed,
    mouseInteraction,
    glowIntensity,
    saturation,
    mouseRepulsion,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    transparent,
    lightMode,
    tintOn,
    warmR,
    warmG,
    warmB,
    warmAltR,
    warmAltG,
    warmAltB,
    tintWarmAltAmount,
    coolR,
    coolG,
    coolB,
    tintCoolAmount,
    tintOpacity,
    tintFloor,
  ]);

  // (4) Was `.galaxy-container` in Galaxy.css.
  return <div ref={ctnDom} className={`relative h-full w-full ${className ?? ""}`} />;
}
