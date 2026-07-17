import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "Why Choose Us | Selling Direct vs. Listing, Honestly Compared",
  description:
    "A side-by-side comparison of selling your house to NorthStone versus listing with an agent — timelines, costs, certainty, and which situations favour each.",
  path: "/why-choose-us",
});

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
        <ComparisonTable />
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
