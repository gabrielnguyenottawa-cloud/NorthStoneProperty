import { buildMetadata } from "@/lib/seo";
import { getTestimonials } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Seller Stories & Testimonials | NorthStone Property",
  description:
    "Read what Canadian homeowners say about selling directly to NorthStone — inherited homes, tenanted rentals, tight timelines, and everything in between.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Testimonials", path: "/testimonials" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Seller stories"
              title="In their words"
              lede="Every situation below started with the same two-minute form."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} name={t.name} location={t.location} quote={t.quote} rating={t.rating} />
        ))}
      </div>

      <CtaBand />
    </>
  );
}
