import qrcode from "qrcode-generator";

/** Renders a QR code as plain SVG paths (no innerHTML). `value` must already be a safe URL. */
export function QrCode({ value, label }: { value: string; label: string }) {
  const qr = qrcode(0, "M");
  qr.addData(value);
  qr.make();
  const count = qr.getModuleCount();
  const quiet = 4;
  const size = count + quiet * 2;

  let path = "";
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (qr.isDark(row, col)) path += `M${col + quiet} ${row + quiet}h1v1h-1z`;
    }
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} shapeRendering="crispEdges" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect width={size} height={size} fill="#ffffff" />
      <path d={path} fill="#241a17" />
    </svg>
  );
}
