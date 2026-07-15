import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Thank You — We're On It",
  description: "Your property details have been received. Expect your written cash offer within 24 hours.",
  path: "/get-offer/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <span aria-hidden="true" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-tint text-3xl text-navy">
        ✓
      </span>
      <h1 className="mt-8 text-4xl font-bold">Got it. We're on it.</h1>
      <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted">
        Your details are with our acquisitions team. Expect your written cash
        offer within 24 hours — we may call first if we have a quick question.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <a href={site.phoneHref} className="rounded-full bg-navy px-7 py-3.5 font-semibold text-white hover:bg-navy-deep">
          Questions? Call {site.phone}
        </a>
        <Link href="/blog" className="rounded-full border border-line px-7 py-3.5 font-semibold text-ink hover:border-navy/40">
          Browse our guides meanwhile
        </Link>
      </div>
    </section>
  );
}
