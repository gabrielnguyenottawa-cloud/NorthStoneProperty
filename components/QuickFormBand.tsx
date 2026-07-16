import Image from "next/image";
import { QuickLeadForm } from "./QuickLeadForm";
import { site } from "@/lib/site";

/** Full-width closing section with the two-field quick form. */
export function QuickFormBand({
  heading = "Ready for your no-obligation cash offer?",
  body = "Address and phone number — that's all we need to start. Written offer within 24 hours.",
  sourceSuffix = "closing-band",
  defaultCity,
  defaultProvince = "Ontario",
}: {
  heading?: string;
  body?: string;
  sourceSuffix?: string;
  defaultCity?: string;
  defaultProvince?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src="/images/cta-dusk.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{body}</p>
        <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-lift sm:p-8">
          <QuickLeadForm
            sourceSuffix={sourceSuffix}
            defaultCity={defaultCity}
            defaultProvince={defaultProvince}
            inline
          />
        </div>
        <p className="mt-6 text-white/70">
          Or call{" "}
          <a href={site.phoneHref} className="font-bold text-white hover:underline">
            {site.phone}
          </a>{" "}
          — we pick up.
        </p>
      </div>
    </section>
  );
}
