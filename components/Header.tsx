"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Situations", href: "/situations" },
  { label: "Cities", href: "/cities" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white shadow-soft">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-9 px-6 sm:px-9">
        <Link href="/" className="relative flex items-center" aria-label={`${site.name} — home`}>
          <span aria-hidden="true" className="absolute -inset-3 rounded-full bg-white/10 blur-md" />
          <Image
            src="/logo-reverse.png"
            alt={site.name}
            width={1133}
            height={711}
            priority
            className="relative h-20 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
          />
        </Link>

        <nav className="hidden items-center gap-[42px] lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[21px] text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[18px]">
          <a
            href={site.phoneHref}
            className="hidden text-[21px] font-medium text-white/80 hover:text-white md:inline"
          >
            {site.phone}
          </a>
          <Link
            href="/get-offer"
            className="rounded-full bg-navy px-6 py-3 text-[21px] font-semibold text-white transition-colors hover:bg-navy-deep"
          >
            Get my cash offer
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-3 text-white/90 lg:hidden"
          >
            <svg width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-ink lg:hidden">
          <div className="mx-auto max-w-6xl space-y-1.5 px-6 py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-[18px] py-[15px] text-2xl text-white/85 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="block rounded-md px-[18px] py-[15px] text-2xl font-medium text-stone-light">
              Call {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
