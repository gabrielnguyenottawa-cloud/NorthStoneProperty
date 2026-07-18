import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Get My Cash Offer | Free, Written, No-Obligation",
  description:
    "Tell us where the property is and how to reach you — that's it. You'll receive a written cash offer within 24 hours. No fees, no repairs, no obligation.",
  path: "/get-offer",
});

export default function GetOfferPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6">
          <Breadcrumbs items={[{ name: "Get my offer", path: "/get-offer" }]} />
          <div className="mt-6 max-w-3xl">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.08] sm:text-[3.2rem]">
              Get Your Free Cash Offer
            </h1>
            <p className="mt-5 text-xl font-bold text-ink">
              Two fields. Thirty seconds. A written offer within 24 hours.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Just tell us where the property is and how to reach you — we'll
              handle everything else on a quick call.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl bg-white p-6 shadow-lift sm:p-10">
            <QuickLeadForm sourceSuffix="get-offer" defaultProvince="Ontario" />
            <p className="mt-6 border-t border-line pt-5 text-center text-lg text-muted">
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="font-bold text-navy hover:underline">
                Call {site.phone}
              </a>
            </p>
          </div>
          <aside className="space-y-6 lg:self-start">
            {[
              { title: "What happens next", body: "We call you back, usually within the hour, ask a few simple questions about the property, and deliver a written offer within 24 hours." },
              { title: "No spam, ever", body: "Your information goes to our acquisitions team only. We never sell or share seller data." },
              { title: "No pressure", body: "Our offers don't expire in '48 hours.' Take the time you need and get independent advice." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-line bg-white p-6 shadow-soft">
                <h2 className="text-lg font-extrabold text-ink">{item.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
