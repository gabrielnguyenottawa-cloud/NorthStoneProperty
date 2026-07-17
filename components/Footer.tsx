import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { cityPath, getProvincesWithCities } from "@/lib/queries";
import { QuickLeadForm } from "./QuickLeadForm";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Why choose us", href: "/why-choose-us" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Referral program — earn $2,000", href: "/referrals" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "We can help with",
    links: [
      { label: "Inherited property", href: "/situations/inherited-property" },
      { label: "Divorce or separation", href: "/situations/divorce" },
      { label: "Avoiding foreclosure", href: "/situations/foreclosure" },
      { label: "Problem tenants", href: "/situations/tenants" },
      { label: "Damaged homes", href: "/situations/damaged-property" },
      { label: "All situations", href: "/situations" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Cities we serve", href: "/cities" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export async function Footer() {
  const provinces = await getProvincesWithCities().catch(() => []);
  const ontario = provinces.find((p) => p.code === "ON");

  return (
    <footer className="bg-ink text-white">
      {/* Footer close — one warm invitation, not another form */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">One last thing</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-white">
              Find out what your home is worth to us
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              No obligation, no fees, and no pressure — many homeowners simply
              use our offer as a benchmark.
            </p>
          </div>
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white p-6 shadow-lift">
              <QuickLeadForm sourceSuffix="footer" defaultProvince="Ontario" />
            </div>
            <p className="mt-4 text-center text-white/70">
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="font-bold text-white hover:underline">
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-reverse.png"
            alt={site.name}
            width={1133}
            height={711}
            className="h-16 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            A Canadian real estate investment company buying residential
            properties directly from homeowners across Ontario — expanding
            soon to British Columbia, Alberta, and Nova Scotia.
          </p>
          <p className="mt-4 text-sm text-white/60">
            {site.address.streetAddress}
            <br />
            {site.address.addressLocality}, {site.address.addressRegion}{" "}
            {site.address.postalCode}
          </p>
          <p className="mt-4 text-sm">
            <a href={site.phoneHref} className="font-semibold text-white/85 hover:text-white">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-white/70 hover:text-white">
              {site.email}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/75 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* City links — every Ontario landing page, linked from every page */}
      {ontario && ontario.cities.length > 0 && (
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              We buy houses across Ontario
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
              {ontario.cities.map((city) => (
                <li key={city.id}>
                  <Link
                    href={cityPath(ontario.slug, city.slug)}
                    className="text-xs text-white/60 hover:text-white"
                  >
                    We buy houses in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.legalName} All rights reserved.
          </p>
          <p>
            We are professional home buyers, not licensed real estate agents.
            Always seek independent legal advice before selling.
          </p>
        </div>
      </div>
    </footer>
  );
}
