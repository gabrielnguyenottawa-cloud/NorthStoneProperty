import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { getSituation, getSituations, getProvincesWithCities } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqList } from "@/components/FaqList";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";
import { CityCard } from "@/components/CityCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  const situations = await getSituations().catch(() => []);
  return situations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const situation = await getSituation(slug);
  if (!situation) return {};
  return buildMetadata({
    title: situation.metaTitle ?? situation.title,
    description: situation.metaDescription ?? situation.intro.slice(0, 155),
    path: `/situations/${slug}`,
  });
}

export default async function SituationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const situation = await getSituation(slug);
  if (!situation) notFound();

  const provinces = await getProvincesWithCities();
  const featuredCities = provinces.flatMap((p) =>
    p.cities.slice(0, 2).map((c) => ({ ...c, province: p }))
  );

  return (
    <>
      {situation.faqs.length > 0 && <JsonLd data={faqSchema(situation.faqs)} />}

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Situations", path: "/situations" },
              { name: situation.title, path: `/situations/${slug}` },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">We can help</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl">{situation.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{situation.intro}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div>
          <Prose content={situation.content} />
          {situation.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-6">
                <FaqList faqs={situation.faqs} />
              </div>
            </div>
          )}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-7">
            <h2 className="text-lg font-bold">Get a no-obligation offer</h2>
            <p className="mb-5 mt-1 text-sm text-muted">Find out what your options look like — free.</p>
            <LeadForm compact sourceSuffix="situation-sidebar" />
          </div>
        </aside>
      </div>

      <CtaBand />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold">We buy houses across Canada</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCities.map((c) => (
            <CityCard key={c.id} city={c} />
          ))}
        </div>
      </section>
    </>
  );
}
