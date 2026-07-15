import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveCity } from "../../actions";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const label = "block text-sm font-medium text-ink";

export default async function EditCityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const city = await prisma.city.findUnique({ where: { id }, include: { province: true } });
  if (!city) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {city.name}, {city.province.code}
      </h1>
      <form action={saveCity} className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-soft">
        <input type="hidden" name="id" value={city.id} />
        <div>
          <label className={label} htmlFor="heroHeadline">Hero headline</label>
          <input id="heroHeadline" name="heroHeadline" defaultValue={city.heroHeadline ?? ""} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="intro">Intro paragraph</label>
          <textarea id="intro" name="intro" rows={4} required defaultValue={city.intro} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="marketInsights">Local market insights <span className="font-normal text-muted">(Markdown)</span></label>
          <textarea id="marketInsights" name="marketInsights" rows={12} defaultValue={city.marketInsights ?? ""} className={`${input} font-mono text-xs leading-relaxed`} />
        </div>
        <div>
          <label className={label} htmlFor="neighbourhoods">Neighbourhoods <span className="font-normal text-muted">(comma-separated)</span></label>
          <input id="neighbourhoods" name="neighbourhoods" defaultValue={city.neighbourhoods.join(", ")} className={input} placeholder="Westboro, The Glebe, Barrhaven" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="metaTitle">Meta title</label>
            <input id="metaTitle" name="metaTitle" maxLength={70} defaultValue={city.metaTitle ?? ""} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="metaDescription">Meta description</label>
            <textarea id="metaDescription" name="metaDescription" maxLength={160} rows={2} defaultValue={city.metaDescription ?? ""} className={input} />
          </div>
        </div>
        <button className="rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-deep">
          Save city page
        </button>
      </form>
    </div>
  );
}
