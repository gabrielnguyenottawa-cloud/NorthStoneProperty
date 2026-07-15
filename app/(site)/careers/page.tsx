import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "Careers | NorthStone Property",
  description:
    "Join a growing Canadian real estate investment company. Acquisitions, operations, renovations, and marketing roles across four provinces.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Join us"
              title="Help homeowners move forward"
              lede="We hire people who lead with empathy and close with precision — in acquisitions, operations, renovations, and marketing."
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="leading-relaxed text-muted">
          We don't always have open postings listed, but we're always
          interested in exceptional people. Send your résumé and a short note
          about what you'd want to own to{" "}
          <a href={`mailto:careers@northstoneproperty.ca`} className="font-semibold text-navy hover:underline">
            careers@northstoneproperty.ca
          </a>
          {" "}— we read every one, and we respond.
        </p>
        <p className="mt-6 text-sm text-muted">
          General inquiries: <a href={`mailto:${site.email}`} className="text-navy hover:underline">{site.email}</a>
        </p>
      </section>
    </>
  );
}
