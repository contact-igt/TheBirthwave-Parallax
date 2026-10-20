import s from "./thank-you.module.css";

/** A restrained heartbeat line echoing the Birthwave mark. Decorative. */
export function Heartbeat({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`${s.heartbeat} ${className}`}
      viewBox="0 0 480 80"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={s.heartbeatLine}
        pathLength={1}
        d="M0 46 C 40 46, 70 44, 100 46 S 150 48, 176 46 L 196 38 L 212 52 L 232 8 L 254 72 L 270 40 L 282 46 C 310 46, 330 30, 346 36 S 372 52, 396 46 C 420 42, 450 46, 480 46"
      />
    </svg>
  );
}
