import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getProvincesWithCities, getPublishedPosts, getSituations, getTestimonials } from "@/lib/queries";
import { LeadForm } from "@/components/LeadForm";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PostCard } from "@/components/PostCard";
import { CityCard } from "@/components/CityCard";
import { CtaBand } from "@/components/CtaBand";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "We Buy Houses in Ontario | Fair Cash Offers in 24 Hours | NorthStone Property",
  description:
    "Sell your house fast, as-is, with no fees or commissions. NorthStone Property buys homes directly from owners across Ontario. Written cash offer in 24 hours.",
  path: "/",
});

const promises = [
  { title: "No fees or commissions", body: "The offer we make is the amount you receive. We even cover standard closing costs." },
  { title: "Sell completely as-is", body: "No repairs, no cleaning, no staging. Leave behind anything you don't want to move." },
  { title: "You pick the closing date", body: "Fourteen days or four months — we close on your schedule, not ours." },
  { title: "Your lawyer, your protection", body: "Every transaction closes through your own independent real estate lawyer." },
];

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
      {/* Hero — headline + inline lead form over a real home photo */}
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
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="animate-rise">
            <p className="eyebrow">Direct home buyers · Ontario</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Sell your house on your terms. Not the market's.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              A written cash offer within 24 hours. Close in as little as 14
              days. No repairs, no showings, no commissions — just a
              straightforward sale handled by professionals.
            </p>
            <ul className="mt-8 grid max-w-lg grid-cols-1 gap-3 text-sm font-medium text-ink sm:grid-cols-3">
              {["Offer in 24 hours", "Close in 14+ days", "$0 in fees"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-navy-tint text-xs text-navy">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-10 h-56 overflow-hidden rounded-2xl shadow-soft sm:h-72 lg:hidden">
              <Image
                src="/images/hero-warm.jpg"
                alt="A detached family home with a wraparound porch on a quiet street"
                fill
                sizes="(max-width: 1024px) 100vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="animate-rise-late rounded-2xl bg-white p-6 shadow-lift sm:p-8">
            <h2 className="text-xl font-bold">Get your free cash offer</h2>
            <p className="mb-5 mt-1 text-sm text-muted">Takes about two minutes. No obligation.</p>
            <LeadForm compact sourceSuffix="hero" />
          </div>
        </div>
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

      {/* Promises — photo + checklist, not another card grid */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative h-72 overflow-hidden rounded-2xl shadow-lift sm:h-96 lg:h-[520px]">
            <Image
              src="/images/trust-porch.jpg"
              alt="A brick family home in the early evening light"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why homeowners choose us"
              title="A professional sale, without the process"
            />
            <ul className="mt-10 space-y-7">
              {promises.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-tint text-sm font-bold text-navy">✓</span>
                  <div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Whatever the situation"
          title="We specialize in complicated sales"
          lede="Inherited homes, tenants, damage, deadlines — the properties other buyers avoid are the ones we handle every week."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {situations.map((s) => (
            <Link
              key={s.slug}
              href={`/situations/${s.slug}`}
              className="group rounded-xl border border-line bg-white px-5 py-4 font-semibold text-ink shadow-soft transition-all hover:border-navy/40 hover:text-navy hover:shadow-lift"
            >
              {s.title} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />

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
    </>
  );
}
