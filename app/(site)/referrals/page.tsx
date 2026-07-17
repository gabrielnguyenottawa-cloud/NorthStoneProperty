import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { ReferralForm } from "@/components/ReferralForm";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Referral Program | Earn $2,000 Per Closed Referral",
  description:
    "Know someone in Ontario who needs to sell their house? Refer them to NorthStone Property and earn $2,000 when the purchase closes. No limit on referrals.",
  path: "/referrals",
});

const steps = [
  {
    title: "Tell us about the property",
    body: "Fill out the form below with your info and the homeowner's — with their permission. Takes two minutes.",
  },
  {
    title: "We take it from there",
    body: "We contact the owner within one business day, visit once, and present a written cash offer. You're kept in the loop.",
  },
  {
    title: "You get paid at closing",
    body: "If we buy the property, you receive $2,000 when the sale closes. No cap — refer as many properties as you like.",
  },
];

const faqs = [
  {
    question: "Who can refer a property?",
    answer:
      "Anyone — neighbours, contractors, property managers, lawyers, realtors with clients we can help, family members. If you know a homeowner who needs a fast, as-is sale, you qualify.",
  },
  {
    question: "When do I get paid?",
    answer:
      "The $2,000 referral payment is processed on the day the purchase legally closes and funds are transferred. We'll confirm the closing date with you in advance.",
  },
  {
    question: "What if two people refer the same property?",
    answer:
      "The first referral we receive for a given property is the one that qualifies. We'll tell you right away if a property has already been referred or is already in our pipeline.",
  },
  {
    question: "Does the homeowner need to know I referred them?",
    answer:
      "Yes. Only refer someone who has given you permission to share their contact information. We'll mention you reached out on their behalf — it's a warmer first call for everyone.",
  },
  {
    question: "Is there a limit on referrals?",
    answer:
      "No limit. Some of our best referral partners send us several properties a year — $2,000 each, every time one closes.",
  },
];

export default function ReferralsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Referral program", path: "/referrals" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Referral program"
              title="Know someone who needs to sell? Earn $2,000."
              lede="Refer a homeowner to us, and if we close on their property, you get paid $2,000 at closing. Simple as that — no cap on how many you send."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-stone bg-white font-display text-lg font-bold text-ink">
                {i + 1}
              </span>
              <h2 className="mt-5 text-xl font-bold">{step.title}</h2>
              <p className="mt-2.5 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Send a referral" title="Submit a property" />
            <p className="mt-6 leading-relaxed text-muted">
              The more you can tell us, the faster we move — but all we really
              need is the address and a way to reach the owner. Prefer to talk
              it through first?
            </p>
            <p className="mt-4">
              <a href={site.phoneHref} className="text-2xl font-bold text-ink hover:text-navy">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-muted">
              or email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-navy hover:underline">
                {site.email}
              </a>
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lift sm:p-8">
            <ReferralForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold">Referral program questions</h2>
        <div className="mt-6">
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
