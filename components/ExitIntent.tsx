"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Exit-intent prompt (desktop mouse-leave). Shows once per session, is
 *  fully dismissible, and never traps focus or blocks scrolling for long. */
export function ExitIntent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit-intent-shown")) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exit-intent-shown", "1");
        document.removeEventListener("mouseout", onLeave);
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4"
      onClick={() => setShow(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow">Before you go</p>
        <h2 id="exit-intent-title" className="mt-3 text-2xl font-bold">
          Curious what your home is worth to a cash buyer?
        </h2>
        <p className="mt-3 text-muted">
          It takes two minutes to find out, and there's zero obligation. Many
          homeowners use our offer as a free benchmark.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/get-offer"
            className="flex-1 rounded-full bg-navy px-5 py-3 text-center font-semibold text-white hover:bg-navy-deep"
          >
            Get my free offer
          </Link>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="rounded-full px-5 py-3 font-medium text-muted hover:text-body"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
