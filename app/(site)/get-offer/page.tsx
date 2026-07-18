import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Get A Fair Cash Offer Today | Free, Written, No-Obligation",
  description:
    "Tell us about your property and receive a written cash offer within 24 hours. No fees, no repairs, no obligation — sell only if the numbers work for you.",
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
              Get A Fair Cash Offer Today!
            </h1>
            <p className="mt-5 text-xl font-bold text-ink">
              Sell Your House Fast. No Repairs, No Fees, No Pressure.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              The more you share, the more accurate our first offer — but every
              field can be an estimate. We'll confirm the details together on a
              quick call. Prefer to skip the form?{" "}
              <a href={site.phoneHref} className="font-bold text-navy hover:underline">
                Call {site.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl bg-white p-6 shadow-lift sm:p-10">
            <LeadForm sourceSuffix="get-offer" />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {[
              { title: "What happens next", body: "We review your details, may call with a question or two, and deliver a written offer within 24 hours." },
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
