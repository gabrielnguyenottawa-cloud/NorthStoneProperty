import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import { cityPath, getCity, getProvincesWithCities, getPublishedPosts, getRelatedCities } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { QuickFormBand } from "@/components/QuickFormBand";
import { Prose } from "@/components/Prose";
import { FaqList } from "@/components/FaqList";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CityCard } from "@/components/CityCard";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 3600; // ISR: refresh hourly as the CMS changes

type Params = { provinceSlug: string; citySlug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const provinces = await getProvincesWithCities().catch(() => []);
  return provinces.flatMap((p) =>
    p.cities.map((c) => ({ provinceSlug: p.slug, citySlug: c.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { provinceSlug, citySlug } = await params;
  const city = await getCity(provinceSlug, citySlug);
  if (!city) return {};
  return buildMetadata({
    title:
      city.metaTitle ?? `Sell Your House Fast in ${city.name} | Cash Home Buyers ${city.name}`,
    description:
      city.metaDescription ??
      `We buy houses in ${city.name}, ${city.province.code} in any condition. Fair cash offer in 24 hours, close in as little as 14 days. No fees or commissions.`,
    path: cityPath(provinceSlug, citySlug),
  });
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { provinceSlug, citySlug } = await params;
  const city = await getCity(provinceSlug, citySlug);
  if (!city) notFound();

  const [relatedCities, situations, posts] = await Promise.all([
    getRelatedCities(city.provinceId, city.id),
    prisma.situationPage.findMany({ where: { published: true }, orderBy: { title: "asc" }, take: 4 }),
    getPublishedPosts(3),
  ]);

  const path = cityPath(provinceSlug, citySlug);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({
            name: city.name,
            provinceCode: city.province.code,
            latitude: city.latitude,
            longitude: city.longitude,
            path,
          }),
          ...(city.faqs.length ? [faqSchema(city.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block" aria-hidden="true">
          <Image
            src="/images/city-street.jpg"
            alt=""
            fill
            priority
            sizes="52vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-mist via-mist/25 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:pb-20">
          <Breadcrumbs
            items={[
              { name: "Cities", path: "/cities" },
              { name: city.province.name, path: "/cities" },
              { name: city.name, path },
            ]}
          />
          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow">
                {city.name}, {city.province.code}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl">
                {city.heroHeadline ?? `We Buy Houses For Cash in ${city.name}`}
              </h1>
              <p className="mt-5 text-xl font-semibold text-ink">
                Fast closings. No repairs. No commissions.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{city.intro}</p>
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
                  src="/images/city-street.jpg"
                  alt="A residential street of detached brick homes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 0px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lift sm:p-8">
              <h2 className="text-2xl font-bold">Get your {city.name} cash offer</h2>
              <p className="mb-5 mt-1 text-muted">Two fields. Takes 30 seconds.</p>
              <QuickLeadForm sourceSuffix="city-hero" defaultCity={city.name} defaultProvince={city.province.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Local market insights */}
      {city.marketInsights && (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Prose content={city.marketInsights} />
        </section>
      )}

      {/* Neighbourhoods */}
      {city.neighbourhoods.length > 0 && (
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Where we buy"
              title={`Neighbourhoods we serve in ${city.name}`}
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {city.neighbourhoods.map((n) => (
                <li key={n} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-body">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={`Selling to us in ${city.name}`}
          lede="The same simple process, whether your home is downtown or in the suburbs."
        />
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </section>

      {/* Situations */}
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Common situations"
            title={`We buy ${city.name} homes in every situation`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {situations.map((s) => (
              <Link
                key={s.slug}
                href={`/situations/${s.slug}`}
                className="rounded-xl border border-line bg-white px-5 py-4 font-semibold text-ink shadow-soft transition-all hover:border-navy/40 hover:text-navy"
              >
                {s.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {city.testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading eyebrow="Seller stories" title={`Recent sellers in ${city.name}`} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {city.testimonials.map((t) => (
              <TestimonialCard key={t.id} name={t.name} location={t.location} quote={t.quote} rating={t.rating} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {city.faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Good to know"
            title={`Selling a house in ${city.name}: your questions`}
          />
          <div className="mt-10">
            <FaqList faqs={city.faqs} />
          </div>
        </section>
      )}

      <QuickFormBand
        heading={`Ready to sell your ${city.name} home?`}
        body="Address and phone number — that's all we need to start. Written offer within 24 hours."
        sourceSuffix="city-closing"
        defaultCity={city.name}
        defaultProvince={city.province.name}
      />

      {/* Internal links: related cities + guides */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Nearby cities in {city.province.name}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {relatedCities.map((c) => (
                <CityCard key={c.id} city={c} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Helpful guides</h2>
            <div className="mt-6 space-y-4">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block rounded-xl border border-line bg-white px-5 py-4 shadow-soft transition-all hover:border-navy/40">
                  <span className="font-semibold text-ink">{post.title}</span>
                  <span className="mt-1 block text-sm text-muted">{post.excerpt.slice(0, 110)}…</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
