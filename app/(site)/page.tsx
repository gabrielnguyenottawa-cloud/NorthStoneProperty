import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getProvincesWithCities, getPublishedPosts, getSituations, getTestimonials } from "@/lib/queries";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { QuickFormBand } from "@/components/QuickFormBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PostCard } from "@/components/PostCard";
import { CityCard } from "@/components/CityCard";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "We Buy Houses For Cash in Ontario | Offer in 24 Hours | NorthStone Property",
  description:
    "Sell your house fast, as-is, with no fees or commissions. NorthStone Property buys homes directly from owners across Ontario. Written cash offer in 24 hours.",
  path: "/",
});

const benefits = [
  { title: "No fees or commissions", body: "The offer we make is the amount you receive. We even cover standard closing costs." },
  { title: "Sell completely as-is", body: "No repairs, no cleaning, no staging. Leave behind anything you don't want to move." },
  { title: "You pick the closing date", body: "Fourteen days or four months — we close on your schedule, not ours." },
  { title: "Your lawyer, your protection", body: "Every transaction closes through your own independent real estate lawyer." },
  { title: "No showings, no open houses", body: "One visit from us — or a video walkthrough. No strangers through your home." },
  { title: "A firm offer, in writing", body: "No financing or inspection conditions. When we make an offer, it sticks." },
];

const extraReasons = ["Relocating for work or family", "Downsizing to something simpler", "Behind on mortgage payments", "Just want a fast, certain sale"];

export default async function HomePage() {
  const [provinces, posts, situations, testimonials] = await Promise.all([
    getProvincesWithCities(),
    getPublishedPosts(3),
    getSituations(),
    getTestimonials(true),
  ]);
  const ontario = provinces.find((p) => p.code === "ON");
  const expanding = provinces.filter((p) => p.code !== "ON");

  return (
    <>
      {/* Hero — headline + two-field quick form */}
      <section className="relative overflow-hidden bg-mist">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block" aria-hidden="true">
          <Image
            src="/images/hero-warm.jpg"
            alt=""
            fill
            priority
            sizes="52vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-mist via-mist/25 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div className="animate-rise">
            <p className="eyebrow">Direct home buyers · Ontario</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.3rem]">
              We buy houses for cash in Ontario.
            </h1>
            <p className="mt-5 text-xl font-semibold text-ink">
              Fast closings. No repairs. No commissions.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
              Tell us where the property is and how to reach you — that's it.
              You'll get a written cash offer within 24 hours, and you deal
              directly with a local buyer, not a call centre.
            </p>
            <div className="relative mt-10 h-56 overflow-hidden rounded-2xl shadow-soft sm:h-72 lg:hidden">
              <Image
                src="/images/hero-warm.jpg"
                alt="A detached family home on a quiet street at golden hour"
                fill
                sizes="(max-width: 1024px) 100vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="animate-rise-late rounded-2xl bg-white p-6 shadow-lift sm:p-8">
            <h2 className="text-2xl font-bold">Get your free cash offer</h2>
            <p className="mb-5 mt-1 text-muted">Two fields. Takes 30 seconds.</p>
            <QuickLeadForm sourceSuffix="hero" defaultProvince="Ontario" />
            <p className="mt-5 border-t border-line pt-4 text-center text-sm text-muted">
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="font-semibold text-navy hover:underline">
                Call {site.phone}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line bg-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 text-sm font-semibold text-ink sm:px-6 lg:grid-cols-4">
          {["Written offer in 24 hours", "Close in as little as 14 days", "$0 in fees or commissions", "Your own lawyer closes the sale"].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-tint text-xs text-navy">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps between you and sold"
          lede="We've removed everything that makes selling a home slow, expensive, and uncertain."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
        <div className="mt-10">
          <Link href="/how-it-works" className="font-semibold text-navy hover:underline">
            See the full process in detail →
          </Link>
        </div>
      </section>

      {/* Meet your buyer — swap image for Gabriel's photo when it lands */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="relative h-72 overflow-hidden rounded-2xl shadow-lift sm:h-96 lg:h-[440px]">
            <Image
              src="/images/trust-porch.jpg"
              alt="A family home with a wraparound porch"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Who you're dealing with"
              title="A local buyer, not a call centre"
            />
            <div className="mt-6 space-y-4 leading-relaxed text-body">
              <p>
                NorthStone Property is an Ottawa-based real estate investment
                company. When you reach out, you talk to the person who
                actually buys the house — not an answering service, not a
                franchise, and never a pressure salesperson.
              </p>
              <p>
                We explain every offer line by line, encourage you to compare
                your options, and close through your own independent lawyer so
                you're protected at every step.
              </p>
            </div>
            <p className="mt-8">
              <Link href="/about" className="font-semibold text-navy hover:underline">
                More about us →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Why homeowners choose us"
          title="A professional sale, without the process"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-line bg-white p-7 shadow-soft">
              <h3 className="text-lg font-bold">{b.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* No matter your reason */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="No matter your reason"
            title="Whatever brought you here, we can help"
            lede="These are the situations we work with every week — the guides explain your options honestly, including the ones that don't involve us."
          />
          <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/situations/${s.slug}`}
                  className="group flex items-center gap-3 font-semibold text-ink hover:text-navy"
                >
                  <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-tint text-xs text-navy">✓</span>
                  {s.title}
                  <span aria-hidden="true" className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
                </Link>
              </li>
            ))}
            {extraReasons.map((r) => (
              <li key={r} className="flex items-center gap-3 font-semibold text-ink">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-tint text-xs text-navy">✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Seller stories" title="What homeowners say afterward" center />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.id} name={t.name} location={t.location} quote={t.quote} rating={t.rating} />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/testimonials" className="font-semibold text-navy hover:underline">
            Read more seller stories →
          </Link>
        </p>
      </section>

      {/* Cities — Ontario front and centre, other provinces coming soon */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="Where we buy"
            title="Serving homeowners across Ontario"
            lede="From Ottawa to Windsor to Thunder Bay — with more communities added regularly."
          />
          {ontario && (
            <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {ontario.cities.slice(0, 12).map((city) => (
                <CityCard key={city.id} city={{ ...city, province: ontario }} />
              ))}
            </div>
          )}
          <p className="mt-10">
            <Link href="/cities" className="font-semibold text-navy hover:underline">
              View every Ontario city we serve →
            </Link>
          </p>
          {expanding.length > 0 && (
            <p className="mt-6 border-t border-line pt-6 text-muted">
              Expanding soon to{" "}
              {expanding.map((p) => p.name).join(", ").replace(/, ([^,]*)$/, ", and $1")}.
            </p>
          )}
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Homeowner resources"
          title="Guides for every kind of sale"
          lede="Practical, plain-language advice on probate, taxes, tenants, timing, and everything in between."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/blog" className="font-semibold text-navy hover:underline">
            Browse all guides →
          </Link>
        </p>
      </section>

      <QuickFormBand sourceSuffix="home-closing" />
    </>
  );
}
