"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Floating "Get my cash offer" bar. Appears after the visitor scrolls past
 *  the hero; hidden on /get-offer and /admin. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 shadow-lift backdrop-blur sm:hidden">
      <Link
        href="/get-offer"
        className="block w-full rounded-full bg-navy px-6 py-3 text-center text-base font-semibold text-white"
      >
        Get my cash offer
      </Link>
    </div>
  );
}
