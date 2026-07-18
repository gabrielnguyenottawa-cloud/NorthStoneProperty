import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickFormBand } from "@/components/QuickFormBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "How It Works | Sell Your House in 3 Simple Steps",
  description:
    "From first contact to closing day: exactly how our direct home-buying process works in Ontario and Alberta, how we calculate offers, and what happens at every step.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "Step 1: Tell Us About Your Property",
    body: "Fill out our quick form or call us directly at " + site.phone + ". All we need to get started is the property address and how to reach you. We'll ask a few simple questions about the condition and your timeline — there's nothing to prepare, nothing to clean, and no obligation whatsoever.",
  },
  {
    title: "Step 2: Get Your Fair Cash Offer",
    body: "We schedule one short visit at a time that works for you (or a video walkthrough if you're out of town). Within 24 hours you receive a firm written cash offer — and we walk you through exactly how we calculated it: recent comparable sales, minus estimated repairs, minus our margin. Full transparency, no games, no pressure to accept.",
  },
  {
    title: "Step 3: Choose Your Closing Date",
    body: "You decide when to close — as fast as 14 days or as far out as you need. Your own independent real estate lawyer handles the paperwork, pays out any mortgage, and transfers your funds through their trust account. Take what you want, leave the rest behind. We handle everything else.",
  },
];

const benefits = [
  { title: "Any condition", body: "Fire damage, hoarding, foundation issues, or perfectly fine — we buy it all." },
  { title: "No commissions or fees", body: "The offer we make is the amount you receive. We even cover standard closing costs." },
  { title: "Your timeline", body: "Two weeks or four months — the closing date is always your call." },
  { title: "We handle the paperwork", body: "Our team and your lawyer take care of everything from offer to closing day." },
];

const faqs = [
  { question: "Does the visit cost anything?", answer: "No. The visit, the evaluation, and the written offer are all completely free with no obligation to accept." },
  { question: "What if I change my mind?", answer: "Until you sign the purchase agreement, you can walk away at any time — and we'll never pressure you. Even our signed agreements include the standard legal protections your lawyer will explain." },
  { question: "Do you buy homes with mortgages still on them?", answer: "Yes — most homes we buy have a mortgage. Your lawyer pays it out from the sale proceeds at closing, and you receive the balance." },
  { question: "Who is NorthStone Property?", answer: "We're a Canadian real estate investment company that renovates and rents or resells residential properties across Ontario and Alberta. We buy directly, with our own capital — which is why we can close without financing conditions." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "How it works", path: "/how-it-works" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              No Repairs. No Hassle. Just Sold.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Selling a house is usually a three-month project. We've compressed
              it into three simple steps you can complete in as little as two
              weeks — anywhere in Ontario and Alberta.
            </p>
            <p className="mt-6">
              <Link
                href="/get-offer"
                className="inline-block rounded-md bg-navy px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink"
              >
                Get A Cash Offer
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Big numbered steps */}
      <section className="bg-mist">
        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 sm:px-6">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-3xl font-extrabold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="text-2xl font-extrabold sm:text-3xl">{s.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-width photo */}
      <section className="relative h-72 sm:h-96">
        <Image
          src="/images/cta-dusk.jpg"
          alt="A home purchased by NorthStone Property at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/50">
          <p className="px-4 text-center text-3xl font-extrabold text-white sm:text-4xl">
            We Buy Houses For Cash
          </p>
        </div>
      </section>

      {/* Benefit callouts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-4xl font-extrabold">Why Homeowners Choose Us</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-line bg-white p-7 text-center shadow-soft">
              <h3 className="text-xl font-extrabold">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center">
          <Link href="/blog/investor-vs-realtor" className="text-lg font-bold text-navy hover:underline">
            Should I sell to an investor or a realtor? Read our honest breakdown →
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-mist">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold">Common Questions About the Process</h2>
          <div className="mt-8">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <QuickFormBand sourceSuffix="how-it-works" />
    </>
  );
}
