import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "Why Choose Us | Selling Direct vs. Listing, Honestly Compared",
  description:
    "A side-by-side comparison of selling your house to NorthStone versus listing with an agent — timelines, costs, certainty, and which situations favour each.",
  path: "/why-choose-us",
});

const rows = [
  { label: "Time to a firm sale", us: "24 hours to a written offer", them: "30–90+ days on market" },
  { label: "Time to close", us: "14 days — or your chosen date", them: "30–60 days after an accepted offer" },
  { label: "Commissions", us: "None", them: "Typically 4–5% + HST" },
  { label: "Repairs & staging", us: "Sell completely as-is", them: "Usually required to compete" },
  { label: "Showings", us: "One visit", them: "Ongoing showings & open houses" },
  { label: "Risk of deal collapse", us: "None — cash, no conditions", them: "Financing & inspection conditions" },
  { label: "Best for", us: "Speed, certainty, as-is properties", them: "Move-in-ready homes, flexible timelines" },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Why choose us", path: "/why-choose-us" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="An honest comparison"
              title="Direct sale vs. listing: the trade-offs, side by side"
              lede="A cash offer is typically below full retail price — that's the honest trade for speed, certainty, and zero costs. Here's the full picture so you can decide with clear eyes."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="overflow-x-auto rounded-2xl border border-line shadow-soft">
          <table className="w-full min-w-[560px] border-collapse bg-white text-left text-sm">
            <thead>
              <tr className="bg-ink text-white">
                <th scope="col" className="px-5 py-4 font-semibold"> </th>
                <th scope="col" className="px-5 py-4 font-semibold">Selling to NorthStone</th>
                <th scope="col" className="px-5 py-4 font-semibold">Listing with an agent</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-mist" : "bg-white"}>
                  <th scope="row" className="px-5 py-4 font-semibold text-ink">{row.label}</th>
                  <td className="px-5 py-4 text-navy-deep font-medium">{row.us}</td>
                  <td className="px-5 py-4 text-muted">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 leading-relaxed text-muted">
          Our recommendation, genuinely: if your home is in good condition and
          you can comfortably wait three to four months, get a listing
          valuation too. Then get our written offer, compare the <em>net</em> numbers
          after commissions, repairs, and carrying costs — and choose the path
          that fits your life.
        </p>
      </section>

      <CtaBand />
    </>
  );
}
