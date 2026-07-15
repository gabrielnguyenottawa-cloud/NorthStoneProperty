import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "Contact Us | NorthStone Property",
  description:
    "Call, email, or send us your property details — a real person responds within one business day, usually much sooner.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Talk to us"
              title="A real person, within one business day"
              lede="Questions, second opinions, or 'we're just exploring' — all welcome."
            />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold">Phone</h2>
            <a href={site.phoneHref} className="mt-2 block text-2xl font-bold text-navy hover:underline">
              {site.phone}
            </a>
            <p className="mt-1 text-sm text-muted">Monday–Saturday, 8am–8pm ET</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Email</h2>
            <a href={`mailto:${site.email}`} className="mt-2 block font-semibold text-navy hover:underline">
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="text-xl font-bold">Head office</h2>
            <p className="mt-2 text-muted">
              {site.address.streetAddress}
              <br />
              {site.address.addressLocality}, {site.address.addressRegion} {site.address.postalCode}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-8">
          <h2 className="text-xl font-bold">Or tell us about your property</h2>
          <p className="mb-5 mt-1 text-sm text-muted">We'll respond with a written offer within 24 hours.</p>
          <LeadForm compact sourceSuffix="contact" />
        </div>
      </div>
    </>
  );
}
