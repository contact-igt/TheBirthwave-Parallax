import fs from "fs";
import path from "path";
import sharp from "sharp";

/**
 * Generates two optimized WebP sets from high-resolution source frames:
 * - Desktop: 1920x1080 (keeping every 2nd frame)
 * - Mobile: 720x1280 portrait (keeping every 2nd frame)
 *
 * Guard: If source is only 720p (width <= 1280 and height <= 720),
 * halts immediately without upscaling.
 */
async function processFrames() {
  console.log("Checking source frames in public/images/hero-frames...");

  const rawDesktopDir = fs.existsSync("public/images/hero-frames/raw-99/desktop")
    ? "public/images/hero-frames/raw-99/desktop"
    : "public/images/hero-frames/desktop";

  const rawMobileDir = fs.existsSync("public/images/hero-frames/raw-99/mobile")
    ? "public/images/hero-frames/raw-99/mobile"
    : "public/images/hero-frames/mobile";

  const desktopFiles = fs.readdirSync(rawDesktopDir).filter((f) => f.match(/\.(webp|jpg|jpeg|png)$/i)).sort();
  const mobileFiles = fs.readdirSync(rawMobileDir).filter((f) => f.match(/\.(webp|jpg|jpeg|png)$/i)).sort();

  if (desktopFiles.length === 0) {
    console.error("No source frames found in " + rawDesktopDir);
    process.exit(1);
  }

  // 1. Validate resolution
  const sampleMeta = await sharp(path.join(rawDesktopDir, desktopFiles[0])).metadata();
  console.log(`Detected desktop source resolution: ${sampleMeta.width}x${sampleMeta.height}`);

  if (sampleMeta.width <= 1280 && sampleMeta.height <= 720) {
    console.error("Source is only 720p. Stopping — do not upscale.");
    process.exit(1);
  }

  // 2. Determine frames to keep: every 2nd frame, always including the final frame
  const selectedIndices = [];
  for (let i = 0; i < desktopFiles.length; i += 2) {
    selectedIndices.push(i);
  }
  if (selectedIndices[selectedIndices.length - 1] !== desktopFiles.length - 1) {
    selectedIndices[selectedIndices.length - 1] = desktopFiles.length - 1;
  }

  console.log(`Subsampling: keeping ${selectedIndices.length} frames out of ${desktopFiles.length}`);

  const outDesktopDir = "public/images/hero-frames/desktop";
  const outMobileDir = "public/images/hero-frames/mobile";

  // Create temporary output folders to allow clean swap
  const tempDesktopDir = "public/images/hero-frames/desktop-temp";
  const tempMobileDir = "public/images/hero-frames/mobile-temp";
  fs.mkdirSync(tempDesktopDir, { recursive: true });
  fs.mkdirSync(tempMobileDir, { recursive: true });

  let desktopBytesAfter = 0;
  let mobileBytesAfter = 0;

  for (let outIdx = 0; outIdx < selectedIndices.length; outIdx++) {
    const srcIdx = selectedIndices[outIdx];
    const outFileName = `frame_${String(outIdx + 1).padStart(6, "0")}.webp`;

    // Desktop: 1920x1080
    const dSrcPath = path.join(rawDesktopDir, desktopFiles[srcIdx]);
    const dDestPath = path.join(tempDesktopDir, outFileName);
    const dBuf = await sharp(dSrcPath)
      .resize(1920, 1080, { fit: "cover", position: "centre" })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
    fs.writeFileSync(dDestPath, dBuf);
    desktopBytesAfter += dBuf.length;

    // Mobile: 720x1280 portrait
    const mSrcFile = mobileFiles[srcIdx] || desktopFiles[srcIdx];
    const mSrcPath = fs.existsSync(path.join(rawMobileDir, mSrcFile))
      ? path.join(rawMobileDir, mSrcFile)
      : path.join(rawDesktopDir, desktopFiles[srcIdx]);
    const mDestPath = path.join(tempMobileDir, outFileName);
    const mBuf = await sharp(mSrcPath)
      .resize(720, 1280, { fit: "cover", position: "centre" })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
    fs.writeFileSync(mDestPath, mBuf);
    mobileBytesAfter += mBuf.length;

    if ((outIdx + 1) % 10 === 0 || outIdx === selectedIndices.length - 1) {
      console.log(`Processed ${outIdx + 1}/${selectedIndices.length} frames...`);
    }
  }

  // Swap temp folders into place
  // Clean existing destination files
  fs.readdirSync(outDesktopDir).forEach((f) => fs.unlinkSync(path.join(outDesktopDir, f)));
  fs.readdirSync(outMobileDir).forEach((f) => fs.unlinkSync(path.join(outMobileDir, f)));

  // Move files over
  fs.readdirSync(tempDesktopDir).forEach((f) => {
    fs.renameSync(path.join(tempDesktopDir, f), path.join(outDesktopDir, f));
  });
  fs.readdirSync(tempMobileDir).forEach((f) => {
    fs.renameSync(path.join(tempMobileDir, f), path.join(outMobileDir, f));
  });

  fs.rmdirSync(tempDesktopDir);
  fs.rmdirSync(tempMobileDir);

  // Baseline comparison
  const originalNestedDir = "public/images/about/nested";
  let originalBytes = 0;
  if (fs.existsSync(originalNestedDir)) {
    fs.readdirSync(originalNestedDir).forEach((f) => {
      originalBytes += fs.statSync(path.join(originalNestedDir, f)).size;
    });
  }

  console.log("\n==========================================");
  console.log("HERO SEQUENCE OPTIMIZATION SUMMARY");
  console.log("==========================================");
  console.log(`Frames kept: ${selectedIndices.length} (every 2nd frame)`);
  console.log(`Original (1280x720 JPG, 99 frames): ${(originalBytes / (1024 * 1024)).toFixed(2)} MB (${originalBytes} B)`);
  console.log(`Desktop WebP (1920x1080, ${selectedIndices.length} frames): ${(desktopBytesAfter / (1024 * 1024)).toFixed(2)} MB (${desktopBytesAfter} B)`);
  console.log(`Mobile WebP (720x1280, ${selectedIndices.length} frames): ${(mobileBytesAfter / (1024 * 1024)).toFixed(2)} MB (${mobileBytesAfter} B)`);
  console.log("==========================================\n");
}

processFrames().catch((err) => {
  console.error("Processing failed:", err);
  process.exit(1);
});
