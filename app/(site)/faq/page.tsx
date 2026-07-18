import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { QuickFormBand } from "@/components/QuickFormBand";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | NorthStone Property",
  description:
    "Everything homeowners ask before selling to us: how cash offers work, timelines, closing, legal protection, fees, and the types of properties we buy in Ontario and Alberta.",
  path: "/faq",
});

const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    faqs: [
      {
        question: "Who does NorthStone Property work with?",
        answer:
          "Homeowners across Ontario and Alberta who want a simple, certain sale — people navigating inheritances, separations, difficult tenants, homes that need work, or simply a timeline the traditional market can't meet. If you own a residential property and want it sold without the usual process, we can help.",
      },
      {
        question: "Where does NorthStone Property buy houses?",
        answer:
          "We buy houses across Ontario and Alberta — from Ottawa to Windsor to Thunder Bay, and Calgary to Edmonton to Lethbridge. Don't see your city on our list? Reach out anyway; we can often still help.",
      },
      {
        question: "Do I need to fix up my property before selling?",
        answer:
          "No. We buy houses completely as-is — no repairs, no cleaning, no staging. Leave behind anything you don't want to move. Houses with fire damage, water damage, foundation issues, or decades of deferred maintenance are properties we buy every week.",
      },
      {
        question: "How do I request an offer?",
        answer: `Fill out the two-field form on any page of this site (property address and phone number is all we need), or call us directly at ${site.phone}. We'll take it from there.`,
      },
    ],
  },
  {
    id: "how-we-buy",
    title: "How We Buy Houses",
    faqs: [
      {
        question: "How does the cash offer process work?",
        answer:
          "Three steps. First, tell us about the property. Second, we schedule one short visit (or video walkthrough) and present a written cash offer within 24 hours — with the math shown: comparable sales, minus estimated repairs, minus our margin. Third, if you accept, you pick the closing date and your own lawyer handles the funds.",
      },
      {
        question: "What makes working with a cash home buyer different from using a realtor?",
        answer:
          "A realtor lists your house and searches for a buyer — which means showings, conditions, commissions, and 30-90+ days of uncertainty. We ARE the buyer. No showings, no financing conditions, no commissions, and a firm written offer within 24 hours. The trade-off is honest: our offer is below full retail price in exchange for speed, certainty, and zero costs.",
      },
      {
        question: "Will I feel pressured to sell my house?",
        answer:
          "Never. Our offers come with no obligation and no expiry pressure. Many homeowners use our offer simply as a benchmark while they explore other options — and we think that's a smart way to use it. If listing with an agent is genuinely your better path, we'll tell you.",
      },
    ],
  },
  {
    id: "timeline-closing",
    title: "Timeline and Closing",
    faqs: [
      {
        question: "How fast can I sell my house?",
        answer:
          "We deliver a written offer within 24 hours of seeing the property, and we can close in as little as 14 days. If you need more time — months, even — we close on your date instead.",
      },
      {
        question: "Who chooses the closing date?",
        answer:
          "You do. Fourteen days or four months, the calendar is yours. We build the closing around your move, not the other way around.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Through your own independent real estate lawyer. At closing, the funds flow through their trust account: any mortgage is paid out first, and the balance goes directly to you. You're never asked to hand over a deed without your lawyer confirming the money is in trust.",
      },
    ],
  },
  {
    id: "legal-paperwork",
    title: "Legal and Paperwork",
    faqs: [
      {
        question: "Do I need a lawyer to sell my house?",
        answer:
          "Yes — and that protects you. Every transaction we do closes through the seller's own independent real estate lawyer. They review the agreement, handle the title transfer, pay out any mortgage, and release your funds. We never ask you to skip legal representation.",
      },
      {
        question: "Who handles the paperwork?",
        answer:
          "We do the heavy lifting, and your lawyer reviews everything on your behalf. From the purchase agreement to closing documents, you mostly just review and sign.",
      },
      {
        question: "Are there fees or hidden costs?",
        answer:
          "None. No commissions, no closing fees from us, no repair deductions after the fact. The number on your written offer is the number the sale is built on — and we cover standard closing costs.",
      },
    ],
  },
  {
    id: "properties",
    title: "Properties We Buy",
    faqs: [
      {
        question: "What types of properties do you buy?",
        answer:
          "Detached houses, semis, townhouses, condos, duplexes and small multi-family buildings, inherited properties, tenanted rentals, and vacant land. If you're not sure yours qualifies, ask — the answer is usually yes.",
      },
      {
        question: "Do you only buy homes in good condition?",
        answer:
          "The opposite — most of what we buy needs work. Fire or water damage, hoarding situations, failed renovations, structural issues: these are exactly the properties other buyers avoid and we specialize in.",
      },
      {
        question: "Why should I choose NorthStone Property?",
        answer:
          "Because you deal directly with a local buyer, not a call centre. Written offers with the math shown, your own lawyer on every closing, no fees of any kind, and a closing date you control. We put everything in writing so you can compare us against any alternative with a clear head.",
      },
    ],
  },
];

const allFaqs = categories.flatMap((c) => c.faqs);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-xl font-bold text-ink">
              Selling your home shouldn't be confusing.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Straight answers to everything homeowners ask us. Can't find
              yours?{" "}
              <a href={site.phoneHref} className="font-bold text-navy hover:underline">
                Call {site.phone}
              </a>{" "}
              — a real person picks up.
            </p>
          </div>
          {/* Category anchor nav */}
          <nav aria-label="FAQ categories" className="mt-8 flex flex-wrap gap-3">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-md border-2 border-line bg-white px-5 py-2.5 font-bold text-ink transition-colors hover:border-navy hover:text-navy"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* First categories */}
      <section className="bg-mist">
        <div className="mx-auto max-w-3xl space-y-14 px-4 py-16 sm:px-6">
          {categories.slice(0, 3).map((c) => (
            <div key={c.id} id={c.id} className="scroll-mt-24">
              <h2 className="text-3xl font-extrabold">{c.title}</h2>
              <div className="mt-6 space-y-8">
                {c.faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-xl font-bold">{f.question}</h3>
                    <p className="mt-2.5 text-lg leading-relaxed text-body">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-page form */}
      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-white">
            Get a No-Obligation Cash Offer Today!
          </h2>
          <div className="mt-7 rounded-xl bg-white p-6 text-left shadow-lift sm:p-8">
            <QuickLeadForm sourceSuffix="faq-mid" inline />
          </div>
        </div>
      </section>

      {/* Remaining categories */}
      <section className="bg-mist">
        <div className="mx-auto max-w-3xl space-y-14 px-4 py-16 sm:px-6">
          {categories.slice(3).map((c) => (
            <div key={c.id} id={c.id} className="scroll-mt-24">
              <h2 className="text-3xl font-extrabold">{c.title}</h2>
              <div className="mt-6 space-y-8">
                {c.faqs.map((f) => (
                  <div key={f.question}>
                    <h3 className="text-xl font-bold">{f.question}</h3>
                    <p className="mt-2.5 text-lg leading-relaxed text-body">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p>
            <Link href="/how-it-works" className="text-lg font-bold text-navy hover:underline">
              See the full process step by step →
            </Link>
          </p>
        </div>
      </section>

      <QuickFormBand sourceSuffix="faq-bottom" />
    </>
  );
}
