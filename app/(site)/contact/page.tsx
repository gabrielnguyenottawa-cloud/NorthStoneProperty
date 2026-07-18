import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { QuickFormBand } from "@/components/QuickFormBand";

export const metadata = buildMetadata({
  title: "Contact Us | NorthStone Property",
  description:
    "Call, text, or email NorthStone Property — a real person responds within one business day. Open 7 days a week, 8 AM to 8 PM.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              Contact NorthStone Property
            </h1>
            <p className="mt-5 text-xl font-bold text-ink">
              Get in touch with a real person — not a call centre.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Questions, second opinions, or "we're just exploring" — all
              welcome. We respond within one business day, usually much sooner.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold">Call or Text</h2>
              <a href={site.phoneHref} className="mt-2 block text-4xl font-extrabold text-navy hover:underline">
                {site.phone}
              </a>
              <p className="mt-2 text-lg font-bold text-ink">
                Open 7 Days a Week: 8:00 AM – 8:00 PM
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block text-xl font-bold text-navy hover:underline">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Head Office</h2>
              <p className="mt-2 text-lg leading-relaxed text-body">
                {site.address.streetAddress}
                <br />
                {site.address.addressLocality}, {site.address.addressRegion} {site.address.postalCode}
              </p>
            </div>
            <div className="rounded-xl border-2 border-navy-tint bg-white p-6">
              <p className="text-lg font-bold text-ink">
                Ready to sell instead?
              </p>
              <p className="mt-1 text-muted">
                Skip the message and get a written cash offer within 24 hours —
                the form at the bottom of this page takes 30 seconds.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-lift sm:p-8">
            <h2 className="text-2xl font-extrabold">Send Us a Message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <QuickFormBand
        heading="Get a No-Obligation Cash Offer Today!"
        sourceSuffix="contact-bottom"
      />
    </>
  );
}
