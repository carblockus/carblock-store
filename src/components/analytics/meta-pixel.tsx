/**
 * Loads the Meta Pixel base script and fires PageView on every route change.
 *
 * Mounted once in the root layout. Renders nothing visible.
 *
 * The Pixel ID is read from NEXT_PUBLIC_META_PIXEL_ID. If unset, this
 * component renders nothing (so local dev without the env var stays clean).
 */

"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { META_PIXEL_ID, pixel } from "@/lib/meta-pixel";

function PixelRouteListener() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    // Skip the very first PageView — it's already fired in the inline init
    // script. From the 2nd render onward, Next.js soft navigations trigger
    // this effect.
    pixel.pageView();
    // We re-run on every URL change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search?.toString()]);

  return null;
}

export function MetaPixel() {
  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <PixelRouteListener />
      </Suspense>
    </>
  );
}
