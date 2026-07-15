import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { getGlobalFaqs } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | Selling Your House to a Cash Buyer",
  description:
    "Straight answers about selling a house directly: legitimacy, pricing, fees, timelines, legal protection, and what happens at closing.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getGlobalFaqs();

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Good questions"
              title="Everything sellers ask us"
              lede="If your question isn't here, call us — a real person answers, and 'we're just exploring' is a perfectly good reason to call."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <FaqList faqs={faqs} />
      </section>

      <CtaBand />
    </>
  );
}
