"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  sourceSuffix?: string;
  defaultCity?: string;
  defaultProvince?: string;
  /** Inline = fields side by side on desktop (hero/band sections). */
  inline?: boolean;
  /** Render helper text for a dark background. */
  dark?: boolean;
};

const inputClass =
  "w-full rounded-lg border-2 border-line bg-white py-4 pl-12 pr-4 text-lg text-body placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

const iconClass =
  "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy";

/** Two fields, one big button. Everything else is gathered on the follow-up call. */
export function QuickLeadForm({ sourceSuffix, defaultCity, defaultProvince, inline = false, dark = false }: Props) {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={inline ? "grid gap-4 sm:grid-cols-[1.25fr_1fr_auto]" : "space-y-4"}>
        <div className="relative">
          <svg aria-hidden="true" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
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
            placeholder="Property Address"
          />
        </div>
        <div className="relative">
          <svg aria-hidden="true" className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
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
            placeholder="Phone"
          />
        </div>
        {inline && (
          <button
            type="submit"
            disabled={submitting}
            className="w-full whitespace-nowrap rounded-md bg-ink px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-navy-deep disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Sending…" : "Get My Cash Offer"}
          </button>
        )}
      </div>
      {!inline && (
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-navy px-12 py-5 text-xl font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Get My Cash Offer!"}
        </button>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <p className={`text-xs leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
        By requesting an offer you agree to be contacted about your property by
        phone, text, or email. No spam, no obligation — see our privacy policy.
      </p>
    </form>
  );
}
