import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReferralForm } from "@/components/ReferralForm";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Referral Rewards Program | Earn $2,000 Per Closed Referral",
  description:
    "Know someone in Alberta or Ontario who needs to sell their house? Refer them to NorthStone Property and earn $2,000 when the purchase closes. No limit on referrals.",
  path: "/referrals",
});

const steps = [
  {
    title: "Step 1: Refer Someone You Know",
    body: "Fill out the form below with your info and the homeowner's — with their permission. Takes two minutes.",
  },
  {
    title: "Step 2: We Connect With the Seller",
    body: "We reach out within one business day, visit once, and present a written cash offer. You're kept in the loop the whole way.",
  },
  {
    title: "Step 3: You Get Paid $2,000",
    body: "If we buy the property, you receive $2,000 when the sale closes. No cap — refer as many properties as you like.",
  },
];

const whoToRefer = [
  "A friend going through a divorce or separation",
  "Someone who inherited a property they don't want",
  "A senior downsizing or moving to assisted living",
  "A landlord tired of dealing with tenants",
  "A homeowner falling behind on mortgage payments",
  "Anyone with a distressed or damaged property",
  "A neighbour with a vacant house sitting empty",
  "Someone relocating who needs a fast, certain sale",
];

const whyRefer = [
  { title: "Fast closings", body: "We can close in as little as 14 days, so your referral isn't stuck waiting for months." },
  { title: "Fair written offers", body: "Every offer comes with the math shown. Your friend will never feel lowballed in the dark." },
  { title: "No fees or agents", body: "The seller pays zero commissions and zero fees. What we offer is what they receive." },
  { title: "We handle everything", body: "Paperwork, lawyers, timelines — the seller mostly just reviews and signs." },
  { title: "$2,000, every time", body: "Each closed referral pays you $2,000 at closing. There's no limit on how many you send." },
  { title: "Your reputation is safe", body: "No pressure tactics, ever. If our offer isn't their best option, we'll tell them honestly." },
];

const faqs = [
  {
    question: "Who can refer a property?",
    answer:
      "Anyone — neighbours, contractors, property managers, lawyers, realtors with clients we can help, family members. If you know a homeowner in Alberta or Ontario who needs a fast, as-is sale, you qualify.",
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

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "Referral Rewards Program", path: "/referrals" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              Refer a Home, Earn $2,000 — It's That Simple!
            </h1>
            <p className="mt-5 text-xl font-bold text-ink">
              Know someone who needs to sell? Send them our way and get paid
              when we close.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Our best deals come from people like you. That's why we pay
              $2,000 cash for every referred property we end up buying — no
              cap, no fine-print games.
            </p>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="bg-mist">
        <div className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">How the Referral Program Works</h2>
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-2xl font-extrabold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who to refer */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-4xl font-extrabold">Who Should You Refer?</h2>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {whoToRefer.map((w) => (
            <li key={w} className="flex items-center gap-3 rounded-lg border border-line bg-white px-5 py-4 text-lg font-semibold text-ink shadow-soft">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-tint text-sm font-bold text-navy">✓</span>
              {w}
            </li>
          ))}
        </ul>
      </section>

      {/* Why refer to us */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-4xl font-extrabold text-white">
            Why Refer to NorthStone Property?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyRefer.map((w) => (
              <div key={w.title} className="rounded-xl bg-white/5 p-7">
                <h3 className="text-xl font-extrabold text-white">{w.title}</h3>
                <p className="mt-2.5 leading-relaxed text-white/75">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-4xl font-extrabold">Start Earning Today</h2>
            <p className="mt-5 text-lg leading-relaxed text-body">
              The more you can tell us, the faster we move — but all we really
              need is the address and a way to reach the owner. Prefer to talk
              it through first?
            </p>
            <a href={site.phoneHref} className="mt-6 block text-4xl font-extrabold text-navy hover:underline">
              {site.phone}
            </a>
            <p className="mt-2 text-lg text-muted">
              or email{" "}
              <a href={`mailto:${site.email}`} className="font-bold text-navy hover:underline">
                {site.email}
              </a>
            </p>
            <p className="mt-4 text-lg font-bold text-ink">
              There's no limit to how many people you can refer.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lift sm:p-8">
            <h3 className="text-2xl font-extrabold">Submit a Referral</h3>
            <div className="mt-5">
              <ReferralForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-extrabold">Referral Program Questions</h2>
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
