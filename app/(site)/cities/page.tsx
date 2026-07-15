import { buildMetadata } from "@/lib/seo";
import { getProvincesWithCities } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityCard } from "@/components/CityCard";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Cities We Serve | We Buy Houses Across Canada",
  description:
    "NorthStone Property buys houses directly from homeowners in Ontario, British Columbia, Alberta, and Nova Scotia. Find your city and get a cash offer in 24 hours.",
  path: "/cities",
});

export default async function CitiesPage() {
  const provinces = await getProvincesWithCities();

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Cities", path: "/cities" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Where we buy"
              title="Cities we serve across Canada"
              lede="We buy houses directly from homeowners in these communities — and we're expanding all the time. Don't see your city? Reach out anyway; we can often still help."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-16 sm:px-6">
        {provinces.map((province) => (
          <section key={province.id} aria-labelledby={`prov-${province.slug}`}>
            <h2 id={`prov-${province.slug}`} className="text-2xl font-bold">
              {province.name}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {province.cities.map((city) => (
                <CityCard key={city.id} city={{ ...city, province }} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
