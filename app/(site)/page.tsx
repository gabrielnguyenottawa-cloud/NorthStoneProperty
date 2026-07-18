import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getProvincesWithCities, getSituations, getTestimonials, cityPath } from "@/lib/queries";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { ComparisonTable } from "@/components/ComparisonTable";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "We Buy Houses For Cash in Alberta & Ontario | Offer in 24 Hours | NorthStone Property",
  description:
    "Sell your house fast, as-is, with no fees or commissions. NorthStone Property buys homes directly from owners across Alberta & Ontario. Written cash offer in 24 hours.",
  path: "/",
});

const steps = [
  {
    title: "Step 1: Tell Us About Your Property",
    body: "Fill out the quick form or call us directly. Address and phone number is all we need to get started — there's nothing to prepare and nothing to clean.",
  },
  {
    title: "Step 2: Get a Fair Cash Offer",
    body: "We'll give you a no-obligation cash offer based on the true value of your house and honest local market conditions. There are no fees, no repairs, and no pressure to accept our offer.",
  },
  {
    title: "Step 3: Choose Your Closing Date",
    body: "You decide when to close. Whether you want to sell your house fast or need more time to prepare, we'll work with your schedule. Once you accept, we'll close on your timeline.",
  },
];

const extraReasons = [
  "Relocating for work or family",
  "Downsizing to something simpler",
  "Behind on mortgage payments",
  "Bad tenants or vacant rental",
  "Retiring or moving to assisted living",
  "Just want a fast, certain sale",
];

export default async function HomePage() {
  const [provinces, situations, testimonials] = await Promise.all([
    getProvincesWithCities(),
    getSituations(),
    getTestimonials(true),
  ]);
  const ontario = provinces.find((p) => p.code === "ON");

  return (
    <>
      {/* Hero — white, headline left, photo right, inline form */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.4rem]">
              Sell Your House Fast In Alberta & Ontario
            </h1>
            <p className="mt-5 text-[1.7rem] font-bold leading-snug text-ink">
              No Repairs. No Hassle. Just Sold.{" "}
              <span aria-label="rated 5 stars" className="text-amber-500">★★★★★</span>
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              At NorthStone Property, we buy houses in Alberta and Ontario and make selling
              your home simple, fast, and fair. If you're looking to sell your
              house without the stress of repairs, showings, or agent fees,
              we're here to help. As a trusted local cash home buyer, we
              provide honest offers and a smooth process that puts you in
              control.
            </p>
            <div className="mt-7 max-w-2xl">
              <QuickLeadForm sourceSuffix="hero" defaultProvince="Ontario" inline />
            </div>
            <p className="mt-5">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 text-lg font-bold text-navy hover:underline">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                CALL US! {site.phone}
              </a>
            </p>
          </div>
          {/* Swap for Gabriel's cutout photo when it lands */}
          <div className="relative hidden h-[380px] overflow-hidden rounded-xl lg:block">
            <Image
              src="/images/hero-warm.jpg"
              alt="A family home purchased by NorthStone Property"
              fill
              priority
              sizes="30vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* About — photo left, copy right */}
      <section className="border-t border-line bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div className="relative h-64 overflow-hidden rounded-xl sm:h-80">
            <Image
              src="/images/trust-porch.jpg"
              alt="A house with a wraparound porch in Ontario"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold">We Buy Houses in Alberta and Ontario</h2>
            <p className="mt-4 leading-relaxed text-body">
              We give homeowners a simple, stress-free way to sell their house.
              Our mission is to provide clear solutions and fair cash offers so
              that every homeowner feels confident about their next step.
              Whether your house needs major repairs, you're facing a difficult
              situation, or you simply want to skip the traditional listing
              process, we make it easy.
            </p>
            <p className="mt-4 leading-relaxed text-body">
              No showings. No commissions. No conditions on financing or
              inspection. One visit, a written offer within 24 hours, and your
              own lawyer handles the closing.
            </p>
            <Link
              href="/get-offer"
              className="mt-7 inline-block rounded-md bg-navy px-7 py-3.5 font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink"
            >
              Get My Cash Offer
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-4xl font-extrabold">What Our Sellers Say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <figure key={t.id} className="rounded-xl border border-line bg-white p-7 shadow-soft">
              <div aria-label={`${t.rating} out of 5 stars`} className="text-xl text-amber-500">
                {"★".repeat(t.rating)}
              </div>
              <blockquote className="mt-4 leading-relaxed text-body">“{t.quote}”</blockquote>
              <figcaption className="mt-4 font-bold text-ink">
                {t.name} <span className="font-medium text-muted">· {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/testimonials" className="font-bold text-navy hover:underline">
            Read more reviews →
          </Link>
        </p>
      </section>

      {/* Dark band — form card + 3 easy steps */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="rounded-xl bg-white p-7 shadow-lift sm:p-8">
            <Image
              src="/logo.png"
              alt={site.name}
              width={1536}
              height={1024}
              className="mx-auto h-24 w-auto"
            />
            <h2 className="mt-4 text-center text-2xl font-extrabold">
              Get a No-Obligation Cash Offer Today!
            </h2>
            <div className="mt-6">
              <QuickLeadForm sourceSuffix="dark-band" defaultProvince="Ontario" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-white">
              Sell Your House In 3 Easy Steps
            </h2>
            <ol className="mt-8 space-y-8">
              {steps.map((s) => (
                <li key={s.title}>
                  <h3 className="text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Situations grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-4xl font-extrabold">
          Dealing with Power of Sale? Going through Divorce? We Can Help.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-muted">
          Life can change quickly, and sometimes selling your house feels
          overwhelming. That's why we buy houses across Alberta and Ontario in any
          condition and for any reason. Whatever your situation, our goal is to
          make selling simple, fast, and free of hidden fees.
        </p>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/situations/${s.slug}`}
                className="flex items-center gap-3 rounded-lg border border-line bg-white px-5 py-3.5 font-semibold text-ink shadow-soft transition-all hover:border-navy/40 hover:text-navy"
              >
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-tint text-xs font-bold text-navy">✓</span>
                {s.title}
              </Link>
            </li>
          ))}
          {extraReasons.map((r) => (
            <li
              key={r}
              className="flex items-center gap-3 rounded-lg border border-line bg-white px-5 py-3.5 font-semibold text-ink shadow-soft"
            >
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-tint text-xs font-bold text-navy">✓</span>
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link
            href="/get-offer"
            className="inline-block rounded-md bg-navy px-7 py-3.5 font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink"
          >
            Get My Cash Offer
          </Link>
        </p>
      </section>

      {/* Comparison table */}
      <section className="bg-mist">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-4xl font-extrabold">
            Sell Your House to NorthStone Property
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-muted">
            A cash offer is typically below full retail price — that's the
            honest trade for speed, certainty, and zero costs. Here's the full
            picture so you can decide with clear eyes.
          </p>
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-4xl font-extrabold">
          We Buy Houses in Alberta and Ontario
        </h2>
        <div className="mt-12 space-y-12">
          {provinces.map((province) => (
            <div key={province.id}>
              <h3 className="text-2xl font-extrabold">{province.name}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {province.cities.map((city) => (
                  <li key={city.id}>
                    <Link
                      href={cityPath(province.slug, city.slug)}
                      className="font-medium text-body hover:text-navy hover:underline"
                    >
                      We buy houses in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
