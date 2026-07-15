import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toggleCityPublished } from "../actions";
import { cityPath } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminCitiesPage() {
  const provinces = await prisma.province.findMany({
    orderBy: { name: "asc" },
    include: { cities: { orderBy: { name: "asc" } } },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">City pages</h1>
      {provinces.map((province) => (
        <section key={province.id}>
          <h2 className="text-lg font-bold">{province.name}</h2>
          <div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white shadow-soft">
            {province.cities.map((city) => (
              <div key={city.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 text-sm">
                <div>
                  <span className="font-semibold text-ink">{city.name}</span>
                  <a
                    href={cityPath(province.slug, city.slug)}
                    target="_blank"
                    className="ml-3 text-xs text-muted hover:text-navy"
                  >
                    View page ↗
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/admin/cities/${city.id}`} className="font-semibold text-navy hover:underline">
                    Edit content
                  </Link>
                  <form action={toggleCityPublished}>
                    <input type="hidden" name="id" value={city.id} />
                    <button
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        city.published ? "bg-navy-tint text-navy-deep" : "bg-mist text-muted"
                      }`}
                    >
                      {city.published ? "Published" : "Hidden"}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      <p className="text-sm text-muted">
        New cities are added with a database row (see prisma/seed.ts for the template) —
        no code changes required. They appear in the sitemap and on /cities automatically.
      </p>
    </div>
  );
}
