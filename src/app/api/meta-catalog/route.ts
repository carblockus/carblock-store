/**
 * Meta Commerce / Google Merchant product feed.
 *
 * Served as CSV at /api/meta-catalog so Meta Commerce Manager can pull
 * it on a schedule (Settings → Data Source → Scheduled Feed).
 *
 * Format reference:
 *   https://www.facebook.com/business/help/120325381656392
 *
 * The same feed is also valid for Google Merchant Center.
 */

import { NextResponse } from "next/server";
import { products } from "@/lib/mock-products";

const SITE = "https://carblock.us";
const BRAND = "CarBlock";
const CURRENCY = "USD";

// CSV escaping per RFC 4180 — wrap fields containing commas, quotes,
// or newlines in double quotes; double any embedded quotes.
function csvField(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function row(values: (string | number | undefined | null)[]): string {
  return values.map(csvField).join(",");
}

export async function GET() {
  const headers = [
    "id",
    "title",
    "description",
    "availability",
    "condition",
    "price",
    "link",
    "image_link",
    "brand",
    "google_product_category",
    "product_type",
    "item_group_id",
  ];

  const lines: string[] = [headers.join(",")];

  for (const p of products) {
    const longBody =
      p.longDescription
        ?.map((b) => b.body)
        .join(" ")
        .slice(0, 4900) ?? p.shortDescription;

    const description = (longBody || p.shortDescription).slice(0, 4900);

    const productType =
      p.category === "perfume"
        ? "Car Care > Air Fresheners"
        : p.category === "wipes"
          ? "Car Care > Interior Cleaning"
          : "Car Care > Bundles";

    lines.push(
      row([
        p.slug, // id (must be stable & unique)
        p.name, // title
        description, // description
        "in stock", // availability
        "new", // condition
        `${p.price.toFixed(2)} ${CURRENCY}`, // price
        `${SITE}/products/${p.slug}`, // link
        `${SITE}${p.image}`, // image_link
        BRAND, // brand
        "8460", // google_product_category — Vehicles & Parts > Vehicle Parts & Accessories > Vehicle Maintenance, Care & Decor
        productType, // product_type
        p.category, // item_group_id (groups variants)
      ])
    );
  }

  const csv = lines.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "Content-Disposition": 'inline; filename="carblock-meta-feed.csv"',
    },
  });
}
