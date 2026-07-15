import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "Get My Cash Offer | Free, Written, No-Obligation",
  description:
    "Tell us about your property and receive a written cash offer within 24 hours. No fees, no repairs, no obligation — sell only if the numbers work for you.",
  path: "/get-offer",
});

export default function GetOfferPage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Get my offer", path: "/get-offer" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Two minutes, zero obligation"
              title="Tell us about your property"
              lede="The more you share, the more accurate our first offer — but every field can be an estimate. We'll confirm details together."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-10">
          <LeadForm sourceSuffix="get-offer" />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {[
            { title: "What happens next", body: "We review your details, may call with a question or two, and deliver a written offer within 24 hours." },
            { title: "No spam, ever", body: "Your information goes to our acquisitions team only. We never sell or share seller data." },
            { title: "No pressure", body: "Our offers don't expire in '48 hours.' Take the time you need and get independent advice." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-mist p-6">
              <h2 className="font-bold text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
