import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

/** Reusable mid-page conversion band. */
export function CtaBand({
  heading = "Ready for a no-obligation cash offer?",
  body = "Tell us about your property and receive a written offer within 24 hours. No fees, no repairs, no pressure.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src="/images/cta-dusk.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{heading}</h2>
          <p className="mt-3 text-lg text-white/80">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/get-offer"
            className="rounded-full bg-white px-7 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-navy-tint"
          >
            Get my cash offer
          </Link>
          <a
            href={site.phoneHref}
            className="rounded-full border border-white/40 px-7 py-3.5 text-center font-semibold text-white transition-colors hover:bg-white/10"
          >
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
