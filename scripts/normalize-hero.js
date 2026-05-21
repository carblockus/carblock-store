/**
 * One-shot: read the 4 source images from "Pagina web", resize each to
 * 2000×1500 (4:3) with a black background (so the source's natural ratio
 * is preserved — no crop, no stretch), encode as JPG quality 85, and
 * drop them into public/hero/.
 *
 * Usage: node scripts/normalize-hero.js
 *
 * Safe to re-run — it overwrites the target files.
 */

const path = require("path");
const sharp = require("sharp");

const SOURCE_DIR = path.resolve(
  __dirname,
  "..",
  "..",
  "Pagina web",
);
const TARGET_DIR = path.resolve(__dirname, "..", "public", "hero");

const TARGET_W = 2000;
const TARGET_H = 1500; // 4:3 — matches the hero container exactly

const sources = [
  { src: "1..jpg", out: "page-1.jpg" },
  { src: "2.png", out: "page-2.jpg" },
  { src: "3.png", out: "page-3.jpg" },
  { src: "4.png", out: "page-4.jpg" },
];

(async () => {
  console.log(`Source : ${SOURCE_DIR}`);
  console.log(`Target : ${TARGET_DIR}`);
  console.log("");
  for (const { src, out } of sources) {
    const inputPath = path.join(SOURCE_DIR, src);
    const outputPath = path.join(TARGET_DIR, out);
    try {
      const info = await sharp(inputPath)
        .resize(TARGET_W, TARGET_H, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0 },
        })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(outputPath);
      const kb = Math.round(info.size / 1024);
      console.log(`✓ ${out.padEnd(12)} → ${info.width}×${info.height}  ${kb} KB`);
    } catch (err) {
      console.error(`✗ ${src} → ${out}:`, err.message);
    }
  }
  console.log("\nDone.");
})();
