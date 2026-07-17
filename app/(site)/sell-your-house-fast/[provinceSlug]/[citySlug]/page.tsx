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

      {/* Hero — white, Clario-style */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Cities", path: "/cities" },
              { name: city.province.name, path: "/cities" },
              { name: city.name, path },
            ]}
          />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-[2.7rem]">
                {city.heroHeadline ?? `We Buy Houses For Cash in ${city.name}`}
              </h1>
              <p className="mt-4 text-2xl font-bold text-ink">
                No Repairs. No Hassle. Just Sold.{" "}
                <span aria-label="rated 5 stars" className="text-amber-500">★★★★★</span>
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{city.intro}</p>
              <div className="mt-7 max-w-2xl">
                <QuickLeadForm sourceSuffix="city-hero" defaultCity={city.name} defaultProvince={city.province.name} inline />
              </div>
              <p className="mt-5">
                <a href="tel:+13435009275" className="inline-flex items-center gap-2 text-lg font-bold text-navy hover:underline">
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  CALL US! 343-500-9275
                </a>
              </p>
            </div>
            <div className="relative hidden h-[340px] overflow-hidden rounded-xl lg:block">
              <Image
                src="/images/city-street.jpg"
                alt={`A residential street of family homes in ${city.name}`}
                fill
                priority
                sizes="30vw"
                className="object-cover"
              />
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
