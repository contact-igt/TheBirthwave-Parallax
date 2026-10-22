"use client";

import { useCallback, useEffect, useRef } from "react";
import s from "./registration.module.css";

/** Points are stored as fractions of the pad so the drawing survives resizes. */
export type Stroke = Array<{ x: number; y: number }>;

const EXPORT_WIDTH = 640;
const EXPORT_HEIGHT = 200;
const MIN_POINTS = 8;

function paint(ctx: CanvasRenderingContext2D, width: number, height: number, strokes: Stroke[], lineWidth: number) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#241a17";
  ctx.fillStyle = "#241a17";
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (const stroke of strokes) {
    if (stroke.length === 0) continue;
    const pts = stroke.map((p) => ({ x: p.x * width, y: p.y * height }));
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i += 1) {
      const mid = { x: (pts[i].x + pts[i + 1].x) / 2, y: (pts[i].y + pts[i + 1].y) / 2 };
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mid.x, mid.y);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.stroke();
  }
}

export function exportSignature(strokes: Stroke[]): string {
  if (strokes.reduce((n, stroke) => n + stroke.length, 0) < MIN_POINTS) return "";
  const canvas = document.createElement("canvas");
  canvas.width = EXPORT_WIDTH;
  canvas.height = EXPORT_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  paint(ctx, EXPORT_WIDTH, EXPORT_HEIGHT, strokes, 3);
  return canvas.toDataURL("image/png");
}

interface Props {
  strokes: Stroke[];
  onChange: (strokes: Stroke[], dataUrl: string) => void;
  invalid?: boolean;
  describedBy?: string;
}

export function SignaturePad({ strokes, onChange, invalid, describedBy }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>(strokes);
  const drawing = useRef(false);

  useEffect(() => {
    strokesRef.current = strokes;
  }, [strokes]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    paint(ctx, width, height, strokesRef.current, 2.4 * ratio);
  }, []);

  useEffect(() => {
    redraw();
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [redraw, strokes]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    };
  };

  const onDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    strokesRef.current = [...strokesRef.current, [point(event)]];
    redraw();
  };

  const onMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const current = strokesRef.current;
    const last = current[current.length - 1];
    last.push(point(event));
    redraw();
  };

  const finish = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const next = strokesRef.current.map((stroke) => [...stroke]);
    onChange(next, exportSignature(next));
  };

  const empty = strokes.reduce((n, stroke) => n + stroke.length, 0) < MIN_POINTS;

  return (
    <div className={s.pad}>
      <canvas
        id="signature-canvas"
        ref={canvasRef}
        className={s.padCanvas}
        data-invalid={invalid ? "true" : undefined}
        role="img"
        aria-label="Signature area. Draw your signature with a finger, stylus or mouse. If you can’t draw, choose “Type your name” instead."
        aria-describedby={describedBy}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={finish}
        onPointerCancel={finish}
      />
      {empty ? (
        <span className={s.padPlaceholder} aria-hidden="true">
          Sign here
        </span>
      ) : null}
      <span className={s.padLine} aria-hidden="true" />
      <button
        type="button"
        className={s.padClear}
        onClick={() => {
          strokesRef.current = [];
          onChange([], "");
        }}
        disabled={empty}
      >
        Clear
      </button>
    </div>
  );
}
