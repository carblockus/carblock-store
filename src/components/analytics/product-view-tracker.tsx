/**
 * Fires Meta Pixel `ViewContent` once when a product detail page mounts.
 *
 * Mounted from the (server-rendered) product page so we can keep the page
 * itself static.
 */

"use client";

import { useEffect } from "react";
import { pixel } from "@/lib/meta-pixel";

export function ProductViewTracker(props: {
  id: string;
  name: string;
  category: string;
  price: number;
}) {
  useEffect(() => {
    pixel.viewContent(props);
    // Only fire once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);
  return null;
}
