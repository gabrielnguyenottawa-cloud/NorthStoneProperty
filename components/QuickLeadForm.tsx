"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  sourceSuffix?: string;
  defaultCity?: string;
  defaultProvince?: string;
  /** Stack fields vertically (hero card) or inline on one row (band sections). */
  inline?: boolean;
};

const inputClass =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-body placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

/** Two fields, one button. Everything else is gathered on the follow-up call. */
export function QuickLeadForm({ sourceSuffix, defaultCity, defaultProvince, inline = false }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      quick: true,
      address: data.address,
      phone: data.phone,
      city: defaultCity ?? "",
      province: defaultProvince ?? "",
      sourcePath: `${pathname}${sourceSuffix ? `#${sourceSuffix}` : ""}`,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again or call us.");
      }
      router.push("/get-offer/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={inline ? "grid gap-3 sm:grid-cols-[1.4fr_1fr_auto]" : "space-y-3"}>
        <div>
          <label htmlFor={`q-address-${sourceSuffix}`} className="sr-only">
            Property address
          </label>
          <input
            id={`q-address-${sourceSuffix}`}
            name="address"
            required
            minLength={4}
            autoComplete="street-address"
            className={inputClass}
            placeholder="Property address"
          />
        </div>
        <div>
          <label htmlFor={`q-phone-${sourceSuffix}`} className="sr-only">
            Phone number
          </label>
          <input
            id={`q-phone-${sourceSuffix}`}
            name="phone"
            type="tel"
            required
            minLength={7}
            autoComplete="tel"
            className={inputClass}
            placeholder="Phone number"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full whitespace-nowrap rounded-md bg-navy px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Sending…" : "Get My Cash Offer"}
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <p className={`text-xs leading-relaxed text-muted ${inline ? "text-center" : ""}`}>
        By requesting an offer you agree to be contacted about your property by
        phone, text, or email. No spam, no obligation — see our privacy policy.
      </p>
    </form>
  );
}
