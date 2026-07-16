import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "About NorthStone Property | Canadian Direct Home Buyers",
  description:
    "Meet the Canadian real estate investment company behind hundreds of direct home purchases across Ontario, BC, Alberta, and Nova Scotia.",
  path: "/about",
});

const values = [
  { title: "Transparency first", body: "Every offer comes with the math behind it. If our offer isn't your best option, we'll tell you — and point you toward the path that is." },
  { title: "Respect for the situation", body: "Many of our sellers are navigating grief, separation, or financial stress. We move at their pace, communicate clearly, and never apply pressure." },
  { title: "Professional standards", body: "Written agreements, independent legal representation for every seller, and funds through lawyers' trust accounts. Always." },
  { title: "Long-term neighbours", body: "We renovate and return properties to communities as quality housing — we're invested in the same cities our sellers call home." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Who we are"
              title="A different kind of home buyer"
              lede="NorthStone Property is a Canadian real estate investment company that purchases residential properties directly from homeowners — professionally, transparently, and on the seller's timeline."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="relative order-last h-64 overflow-hidden rounded-2xl shadow-lift sm:h-80 lg:order-first lg:h-[440px]">
          <Image
            src="/images/porch-welcome.jpg"
            alt="A welcoming front porch with a swing bench"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-6 leading-relaxed text-body">
          <p>
            We started NorthStone after watching too many homeowners get squeezed
            between two bad options: months of showings and uncertainty on the
            open market, or lowball pressure tactics from buyers who treated
            "distressed" as an invitation.
          </p>
          <p>
            We believed there was a third way — a direct sale run like a
            professional transaction. Written offers with the math shown.
            Independent lawyers on both sides. Closing dates chosen by the
            seller. No fees, no pressure, and no surprises at the closing table.
          </p>
          <p>
            Today we buy homes across Ontario, British Columbia, Alberta, and
            Nova Scotia — many of them inherited properties, homes with tenants,
            houses that need significant work, or sales driven by a deadline the
            traditional market can't meet. We renovate them and return them to
            their communities as quality housing.
          </p>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading eyebrow="How we operate" title="What we hold ourselves to" />
          <ul className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-2">
            {values.map((v) => (
              <li key={v.title} className="flex gap-4">
                <span aria-hidden="true" className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-tint text-sm font-bold text-navy">✓</span>
                <div>
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{v.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
