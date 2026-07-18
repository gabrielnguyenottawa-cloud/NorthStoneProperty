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

      {/* Hero — solid navy with Gab, matching the homepage */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <Image
            src="/images/city-street.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-14 bg-white [clip-path:polygon(0_100%,0_55%,100%_0,100%_100%)]"
        />
        <div className="absolute bottom-0 right-0 top-8 hidden w-[40%] max-w-[560px] lg:block">
          <Image
            src="/images/gab-hero.png"
            alt="Gabriel, founder of NorthStone Property"
            fill
            priority
            sizes="40vw"
            className="object-contain object-[center_bottom]"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-5 sm:px-6">
          <div className="[&_nav]:text-white/60 [&_nav_a:hover]:text-white [&_nav_span]:text-white/85">
            <Breadcrumbs
              items={[
                { name: "Cities", path: "/cities" },
                { name: city.province.name, path: "/cities" },
                { name: city.name, path },
              ]}
            />
          </div>
          <div className="pb-24 pt-8 text-center lg:w-[58%]">
            <h1 className="text-[2.3rem] font-extrabold uppercase leading-[1.12] text-white sm:text-[2.8rem]">
              {city.heroHeadline ?? `We Buy Houses For Cash in ${city.name}`}
            </h1>
            <p className="mt-4 text-[1.7rem] font-bold leading-snug text-white/60">
              No Repairs. No Hassle. Just Sold.{" "}
              <span aria-label="rated 5 stars" className="text-amber-400">★★★★★</span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{city.intro}</p>
            <div className="mt-8 text-left">
              <QuickLeadForm sourceSuffix="city-hero" defaultCity={city.name} defaultProvince={city.province.name} inline dark />
            </div>
            <p className="mt-6 text-lg font-semibold text-white/90">
              Fill out the form above to get started or call us at{" "}
              <a href="tel:+13435009275" className="font-bold text-white underline hover:text-amber-400">
                343-500-9275
              </a>
            </p>
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
