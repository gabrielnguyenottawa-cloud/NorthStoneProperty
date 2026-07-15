import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "How It Works | Sell Your House in 3 Simple Steps",
  description:
    "From first contact to closing day: exactly how our direct home-buying process works, how we calculate offers, and what happens at every step.",
  path: "/how-it-works",
});

const detail = [
  {
    step: "Step 1 — Tell us about the property",
    body: "Fill out our two-minute form or call us directly. We'll ask about the address, the general condition, whether anyone lives there, and your ideal timeline. There's nothing to prepare and nothing to clean — we've seen everything.",
  },
  {
    step: "Step 2 — A short visit and a written offer",
    body: "We schedule one visit at a time that works for you (or a video walkthrough for out-of-town owners). Within 24 hours you receive a written cash offer, and we walk you through the math: recent comparable sales in your neighbourhood, minus estimated repair costs, minus our margin. Full transparency, no games.",
  },
  {
    step: "Step 3 — Your lawyer closes on your date",
    body: "Accept whenever you're ready — there's no expiry pressure. Your own independent real estate lawyer handles the paperwork, your mortgage payout, and the transfer of funds through their trust account. Pick a closing date from 14 days to several months out, and take only what you want; we handle everything left behind.",
  },
];

const faqs = [
  { question: "Does the visit cost anything?", answer: "No. The visit, the evaluation, and the written offer are all completely free with no obligation to accept." },
  { question: "What if I change my mind?", answer: "Until you sign the purchase agreement, you can walk away at any time — and we'll never pressure you. Even our signed agreements include the standard legal protections your lawyer will explain." },
  { question: "Do you buy homes with mortgages still on them?", answer: "Yes — most homes we buy have a mortgage. Your lawyer pays it out from the sale proceeds at closing, and you receive the balance." },
  { question: "Who is NorthStone Property?", answer: "We're a Canadian real estate investment company that renovates and rents or resells residential properties. We buy directly, with our own capital — which is why we can close without financing conditions." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "How it works", path: "/how-it-works" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Our process"
              title="Three steps. One visit. Zero surprises."
              lede="Selling a house is usually a three-month project. We've compressed it into three steps you can complete in as little as two weeks."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ProcessSteps />
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
          {detail.map((d) => (
            <div key={d.step}>
              <h2 className="text-2xl font-bold">{d.step}</h2>
              <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
          <p className="leading-relaxed text-muted">
            Want to understand how our offers compare to listing with an agent?
            Read our honest breakdown:{" "}
            <Link href="/blog/investor-vs-realtor" className="font-semibold text-navy hover:underline">
              Should I sell to an investor or a realtor?
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold">Common questions about the process</h2>
        <div className="mt-6">
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
