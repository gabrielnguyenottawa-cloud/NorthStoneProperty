import { buildMetadata } from "@/lib/seo";
import { getTestimonials } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickFormBand } from "@/components/QuickFormBand";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Reviews | What Sellers Say About NorthStone Property",
  description:
    "Read what Alberta and Ontario homeowners say about selling directly to NorthStone — inherited homes, tenanted rentals, tight timelines, and everything in between.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "Reviews", path: "/testimonials" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              What Our Sellers Say
            </h1>
            <p className="mt-5 text-xl font-bold text-ink">
              Real homeowners. Real situations. Real closings.{" "}
              <span aria-label="rated 5 stars" className="text-amber-500">★★★★★</span>
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Every story below started with the same 30-second form — or a
              call to{" "}
              <a href={site.phoneHref} className="font-bold text-navy hover:underline">
                {site.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Big review cards */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.id} className="rounded-xl border border-line bg-white p-8 shadow-soft">
              <div aria-label={`${t.rating} out of 5 stars`} className="text-2xl text-amber-500">
                {"★".repeat(t.rating)}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed text-body">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 text-lg font-extrabold text-ink">
                {t.name}
                <span className="ml-2 font-medium text-muted">{t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <QuickFormBand
        heading="Ready to write your own story?"
        sourceSuffix="reviews-bottom"
      />
    </>
  );
}
