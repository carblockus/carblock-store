/* eslint-disable */
// Builds a high-resolution static composite of the
// "TRUSTED BY OVER 100,000 SATISFIED DRIVERS" testimonial strip
// for use on Amazon listing pages.
//
// Output: public/marketing/trusted-by-1a.jpg (3400 x 1340, 2x retina)
//
// Run with:  node scripts/build-trusted-by-image.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SOCIAL = path.join(ROOT, "public", "social");
const OUT_DIR = path.join(ROOT, "public", "marketing");

// 2x retina canvas — bigger than Amazon needs, so any down-sample stays crisp
const SCALE = 2;
const W = 1700 * SCALE; // 3400
const H = 670 * SCALE; // 1340

// Card geometry (in design units, before SCALE)
const CARD_W = 305;
const CARD_H = 430;
const CARD_GAP = 18;
const PHOTO_H = 250; // ~ 4/3 ratio relative to card width
const TOTAL_W = 5 * CARD_W + 4 * CARD_GAP; // 1597
const CARDS_X = Math.round((1700 - TOTAL_W) / 2); // ~52
const CARDS_Y = 200; // below header

// Brand colors
const GOLD = "#F2C94C";
const GOLD_DEEP = "#D4AF37";
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const MUTED = "#9A9A9A";
const BORDER = "#1F1F1F";
const SURFACE = "#0A0A0A";

const testimonials = [
  {
    name: "Maria Jose V.",
    car: "JEEP GRAND CHEROKEE",
    text: "Smells incredible 3 months in. Game changer.",
    photo: "IMG_0382.jpg",
  },
  {
    name: "Kevin S.",
    car: "AUDI S6",
    text: "Worth every dollar. Subtle, sophisticated, lasts forever.",
    photo: "IMG_6323.jpg",
  },
  {
    name: "Tyler M.",
    car: "MAZDA CX-5",
    text: "Finally a car scent that doesn't feel cheap.",
    photo: "IMG_1197.jpg",
  },
  {
    name: "David R.",
    car: "RANGE ROVER SPORT",
    text: "My passengers always ask what fragrance I use.",
    photo: "IMG_1125.jpg",
  },
  {
    name: "Brandon K.",
    car: "MERCEDES GLE",
    text: "The wipes brought my leather seats back to life.",
    photo: "att.Iq5h3Q4IrywgGk7YzoBOfKaDYCO5bWI52h638QtfKpw.jpg",
  },
];

function s(n) {
  return Math.round(n * SCALE);
}

function escXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// SVG wrapper for the static text/lines/cards
function buildOverlaySvg() {
  const fontFamily =
    "Oswald, 'Helvetica Neue', Arial, sans-serif";
  const bodyFamily =
    "'Helvetica Neue', Helvetica, Arial, sans-serif";

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;

  // Background black
  svg += `<rect width="${W}" height="${H}" fill="${BLACK}"/>`;

  // Subtle gold radial accents (tone like the site)
  svg += `<defs>
    <radialGradient id="g1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GOLD_DEEP}" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="${GOLD_DEEP}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_DEEP}"/>
    </linearGradient>
    <linearGradient id="photoFade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
    </linearGradient>
  </defs>`;

  svg += `<circle cx="${s(300)}" cy="${s(120)}" r="${s(380)}" fill="url(#g1)"/>`;
  svg += `<circle cx="${s(1450)}" cy="${s(560)}" r="${s(400)}" fill="url(#g2)"/>`;

  // Header
  svg += `<text x="${W / 2}" y="${s(70)}" text-anchor="middle"
    font-family="${bodyFamily}" font-size="${s(18)}" fill="${GOLD}"
    letter-spacing="${s(6)}" font-weight="600">TRUSTED BY</text>`;

  // Big title — split so "100,000" is gold
  // Use one centered line, manually offset by tspans
  svg += `<text x="${W / 2}" y="${s(140)}" text-anchor="middle"
    font-family="${fontFamily}" font-size="${s(74)}" font-weight="700"
    letter-spacing="${s(2)}" fill="${WHITE}">
    OVER <tspan fill="url(#goldGrad)" font-weight="700">100,000</tspan> SATISFIED DRIVERS
  </text>`;

  // Cards
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const x = CARDS_X + i * (CARD_W + CARD_GAP);
    const y = CARDS_Y;

    // Card outer
    svg += `<rect x="${s(x)}" y="${s(y)}" width="${s(CARD_W)}" height="${s(CARD_H)}"
      rx="${s(6)}" ry="${s(6)}"
      fill="${SURFACE}" stroke="${BORDER}" stroke-width="${s(1)}"/>`;

    // Photo gradient overlay sits on top of the photo composite — drawn later in SVG via a separate clipPath
    // Photo fade band at bottom of photo area
    svg += `<rect x="${s(x)}" y="${s(y + PHOTO_H - 60)}"
      width="${s(CARD_W)}" height="${s(60)}"
      fill="url(#photoFade)"/>`;

    // Stars
    const starsY = y + PHOTO_H + 32;
    const starSize = 14;
    const starGap = 4;
    for (let k = 0; k < 5; k++) {
      const sx = x + 24 + k * (starSize + starGap);
      svg += starPath(sx, starsY - starSize / 2, starSize, GOLD);
    }

    // Quote (wrap to ~2 lines max around 32 chars)
    const lines = wrap(`“${t.text}”`, 30);
    let ly = starsY + 30;
    for (const line of lines.slice(0, 3)) {
      svg += `<text x="${s(x + 24)}" y="${s(ly)}"
        font-family="${bodyFamily}" font-size="${s(15)}" fill="#F2F2F2"
        font-weight="500">${escXml(line)}</text>`;
      ly += 22;
    }

    // Divider
    const divY = y + CARD_H - 56;
    svg += `<line x1="${s(x + 24)}" y1="${s(divY)}" x2="${s(x + CARD_W - 24)}" y2="${s(divY)}" stroke="${BORDER}" stroke-width="${s(1)}"/>`;

    // Name + car
    svg += `<text x="${s(x + 24)}" y="${s(divY + 28)}"
      font-family="${bodyFamily}" font-size="${s(15)}" fill="${WHITE}" font-weight="700">${escXml(t.name)}</text>`;
    svg += `<text x="${s(x + CARD_W - 24)}" y="${s(divY + 28)}" text-anchor="end"
      font-family="${bodyFamily}" font-size="${s(10)}" fill="${MUTED}"
      letter-spacing="${s(2)}" font-weight="600">${escXml(t.car)}</text>`;
  }

  svg += `</svg>`;
  return svg;
}

function starPath(cx, cy, size, color) {
  // 5-point star centered at (cx, cy) with bounding size
  const r = size / 2;
  const points = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    points.push(`${s(px)},${s(py)}`);
  }
  return `<polygon points="${points.join(" ")}" fill="${color}"/>`;
}

function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

async function buildPhotoComposite(t, i) {
  const photoPath = path.join(SOCIAL, t.photo);
  const x = CARDS_X + i * (CARD_W + CARD_GAP);
  const y = CARDS_Y;
  const w = s(CARD_W);
  const h = s(PHOTO_H);

  // Cover-fit (center crop) at 2x quality, then round-corner top
  const buf = await sharp(photoPath)
    .rotate() // honor EXIF
    .resize(w, h, { fit: "cover", position: "centre" })
    .toBuffer();

  // Apply rounded top-left/top-right corners via SVG mask
  const r = s(6);
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/>
       <rect x="0" y="${r}" width="${w}" height="${h - r}" fill="#fff"/>
     </svg>`
  );

  const masked = await sharp(buf)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  return {
    input: masked,
    top: s(y),
    left: s(x),
  };
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Build the photo composites first
  const photoOps = await Promise.all(
    testimonials.map((t, i) => buildPhotoComposite(t, i))
  );

  // Render SVG overlay
  const overlaySvg = Buffer.from(buildOverlaySvg());

  // Compose: black canvas -> photos -> SVG overlay (which has transparent card areas where photos sit)
  // The SVG draws the card border and bottom text area; photos go in the top portion of each card.
  // Order matters: draw cards first via SVG (so card backgrounds render), then photos, then a SECOND lightweight SVG with stars/text/dividers above photos.

  // We split the SVG into two layers: cards-bg (drawn under photos) and labels (drawn above).
  // But for simplicity here, we draw photos AFTER the SVG — photos will cover the photo region
  // which is initially transparent in the SVG (we did not draw anything in the photo area).
  // The SVG already includes the bottom photo gradient, but that should be on TOP of the photo.
  // So order: SVG (header + card frames + text) -> photos -> tiny SVG with photo gradient overlay.

  // Re-build a "below photos" overlay (everything except the photo gradient) and an
  // "above photos" overlay (the photo gradient strip on each card).
  const belowSvg = Buffer.from(buildBelowSvg());
  const aboveSvg = Buffer.from(buildAboveSvg());

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: BLACK,
    },
  })
    .composite([
      { input: belowSvg, top: 0, left: 0 },
      ...photoOps,
      { input: aboveSvg, top: 0, left: 0 },
    ])
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(OUT_DIR, "trusted-by-1a.jpg"));

  console.log("✓ Wrote public/marketing/trusted-by-1a.jpg");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

// SVG without the photo-fade gradient (drawn UNDER photos)
function buildBelowSvg() {
  const full = buildOverlaySvg();
  // Strip the photoFade rects — they need to render ABOVE photos.
  return full.replace(
    /<rect[^>]*fill="url\(#photoFade\)"\/>/g,
    ""
  );
}

// SVG containing only the photo-fade gradient strips (drawn ABOVE photos)
function buildAboveSvg() {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="photoFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.45"/>
      </linearGradient>
    </defs>`;
  for (let i = 0; i < testimonials.length; i++) {
    const x = CARDS_X + i * (CARD_W + CARD_GAP);
    const y = CARDS_Y;
    svg += `<rect x="${s(x)}" y="${s(y + PHOTO_H - 60)}"
      width="${s(CARD_W)}" height="${s(60)}"
      fill="url(#photoFade)"/>`;
  }
  svg += `</svg>`;
  return svg;
}
