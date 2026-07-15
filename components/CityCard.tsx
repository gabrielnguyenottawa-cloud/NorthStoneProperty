import Link from "next/link";
import { cityPath } from "@/lib/queries";

export function CityCard({
  city,
}: {
  city: { name: string; slug: string; province: { name: string; code: string; slug: string } };
}) {
  return (
    <Link
      href={cityPath(city.province.slug, city.slug)}
      className="group flex items-center justify-between rounded-xl border border-line bg-white px-5 py-4 shadow-soft transition-all hover:border-navy/40 hover:shadow-lift"
    >
      <span>
        <span className="block font-semibold text-ink transition-colors group-hover:text-navy">
          {city.name}
        </span>
        <span className="text-xs text-muted">{city.province.code}</span>
      </span>
      <span aria-hidden="true" className="text-navy">
        →
      </span>
    </Link>
  );
}
