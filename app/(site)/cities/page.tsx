import { buildMetadata } from "@/lib/seo";
import { getProvincesWithCities } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityCard } from "@/components/CityCard";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Cities We Serve in Ontario | We Buy Houses Ontario-Wide",
  description:
    "NorthStone Property buys houses directly from homeowners across Ontario — from Ottawa to Windsor to Thunder Bay. Find your city and get a cash offer in 24 hours.",
  path: "/cities",
});

export default async function CitiesPage() {
  const provinces = await getProvincesWithCities();
  const ontario = provinces.find((p) => p.code === "ON");
  const expanding = provinces.filter((p) => p.code !== "ON");

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Cities", path: "/cities" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Where we buy"
              title="Cities we serve across Ontario"
              lede="We buy houses directly from homeowners in these Ontario communities — and we're adding more all the time. Don't see your city? Reach out anyway; we can often still help."
            />
          </div>
        </div>
      </section>

      {ontario && (
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <section aria-labelledby={`prov-${ontario.slug}`}>
            <h2 id={`prov-${ontario.slug}`} className="text-2xl font-bold">
              {ontario.name}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ontario.cities.map((city) => (
                <CityCard key={city.id} city={{ ...city, province: ontario }} />
              ))}
            </div>
          </section>
        </div>
      )}

      {expanding.length > 0 && (
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Expanding soon"
              title="More provinces on the way"
              lede="We're working on bringing the same direct, no-fee home buying service to homeowners in these provinces."
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {expanding.map((p) => (
                <li
                  key={p.id}
                  className="rounded-full border border-line bg-white px-5 py-2.5 font-medium text-muted"
                >
                  {p.name} <span className="text-sm">· coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
