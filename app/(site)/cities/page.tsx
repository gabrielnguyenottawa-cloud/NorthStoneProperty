import { buildMetadata } from "@/lib/seo";
import { getProvincesWithCities } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityCard } from "@/components/CityCard";
import { QuickFormBand } from "@/components/QuickFormBand";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Cities We Serve | We Buy Houses in Alberta & Ontario",
  description:
    "NorthStone Property buys houses directly from homeowners across Alberta and Ontario — from Ottawa to Windsor to Calgary. Find your city and get a cash offer in 24 hours.",
  path: "/cities",
});

export default async function CitiesPage() {
  const provinces = await getProvincesWithCities();

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "Cities", path: "/cities" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              We Buy Houses in Alberta and Ontario
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              We buy houses directly from homeowners in these communities — and
              we're adding more all the time. Don't see your city? Reach out
              anyway; we can often still help.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-mist">
        <div className="mx-auto max-w-6xl space-y-14 px-4 py-16 sm:px-6">
          {provinces.map((province) => (
            <section key={province.id} aria-labelledby={`prov-${province.slug}`}>
              <h2 id={`prov-${province.slug}`} className="text-3xl font-extrabold">
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
      </div>

      <QuickFormBand sourceSuffix="cities-bottom" />
    </>
  );
}
