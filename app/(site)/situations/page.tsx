import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getSituations } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "We Buy Houses in Any Situation | Inherited, Divorce, Foreclosure & More",
  description:
    "Whatever brought you here — probate, tenants, damage, deadlines — we buy houses as-is across Canada with fair cash offers and closings on your schedule.",
  path: "/situations",
});

export default async function SituationsPage() {
  const situations = await getSituations();

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Situations", path: "/situations" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="How we help"
              title="Whatever the situation, there's a straightforward way out"
              lede="These are the circumstances we work with most often. Each guide explains your options honestly — including the ones that don't involve us."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-2 sm:px-6">
        {situations.map((s) => (
          <Link
            key={s.slug}
            href={`/situations/${s.slug}`}
            className="group rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow hover:shadow-lift"
          >
            <h2 className="text-xl font-bold transition-colors group-hover:text-navy">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.intro.slice(0, 180)}…</p>
            <p className="mt-4 font-semibold text-navy">Read the guide →</p>
          </Link>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
