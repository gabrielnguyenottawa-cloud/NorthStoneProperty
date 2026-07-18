"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { conditions, propertyTypes, sellingReasons, timelines } from "@/lib/leads";

const provinces = ["Ontario", "British Columbia", "Alberta", "Nova Scotia", "Other"];

type Props = {
  /** Compact = address-first short form (hero/footer). Full = every field (/get-offer). */
  compact?: boolean;
  /** Appended to the source path so you can see which placement converts. */
  sourceSuffix?: string;
  defaultCity?: string;
  defaultProvince?: string;
};

const inputClass =
  "w-full rounded-lg border-2 border-line bg-white px-4 py-3.5 text-base text-body placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

export function LeadForm({ compact = false, sourceSuffix, defaultCity, defaultProvince }: Props) {
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
      ...data,
      consent: data.consent === "on",
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
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`name-${sourceSuffix}`} className={labelClass}>
            Full name
          </label>
          <input id={`name-${sourceSuffix}`} name="name" required minLength={2} autoComplete="name" className={inputClass} placeholder="Jane Tremblay" />
        </div>
        <div>
          <label htmlFor={`phone-${sourceSuffix}`} className={labelClass}>
            Phone
          </label>
          <input id={`phone-${sourceSuffix}`} name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="(613) 555-0142" />
        </div>
      </div>

      <div>
        <label htmlFor={`email-${sourceSuffix}`} className={labelClass}>
          Email
        </label>
        <input id={`email-${sourceSuffix}`} name="email" type="email" required autoComplete="email" className={inputClass} placeholder="jane@example.com" />
      </div>

      <div>
        <label htmlFor={`address-${sourceSuffix}`} className={labelClass}>
          Property address
        </label>
        <input id={`address-${sourceSuffix}`} name="address" required autoComplete="street-address" className={inputClass} placeholder="123 Elm Street" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`city-${sourceSuffix}`} className={labelClass}>
            City
          </label>
          <input id={`city-${sourceSuffix}`} name="city" required defaultValue={defaultCity} autoComplete="address-level2" className={inputClass} placeholder="Ottawa" />
        </div>
        <div>
          <label htmlFor={`province-${sourceSuffix}`} className={labelClass}>
            Province
          </label>
          <select id={`province-${sourceSuffix}`} name="province" required defaultValue={defaultProvince ?? ""} className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {provinces.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`postalCode-${sourceSuffix}`} className={labelClass}>
            Postal code
          </label>
          <input id={`postalCode-${sourceSuffix}`} name="postalCode" required autoComplete="postal-code" className={inputClass} placeholder="K1P 1J9" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`propertyType-${sourceSuffix}`} className={labelClass}>
            Property type
          </label>
          <select id={`propertyType-${sourceSuffix}`} name="propertyType" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`condition-${sourceSuffix}`} className={labelClass}>
            Condition
          </label>
          <select id={`condition-${sourceSuffix}`} name="condition" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {conditions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`timeline-${sourceSuffix}`} className={labelClass}>
            When do you want to sell?
          </label>
          <select id={`timeline-${sourceSuffix}`} name="timeline" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`reason-${sourceSuffix}`} className={labelClass}>
            Reason for selling
          </label>
          <select id={`reason-${sourceSuffix}`} name="reason" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {sellingReasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor={`notes-${sourceSuffix}`} className={labelClass}>
            Anything else we should know? <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id={`notes-${sourceSuffix}`} name="notes" rows={4} className={inputClass} placeholder="Tenants in place, recent renovations, special circumstances…" />
        </div>
      )}

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 rounded border-line accent-[#106b52]" />
        <span>
          I agree to be contacted about my property by phone, text, or email. No
          spam, no obligation — see our privacy policy.
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-navy px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get My Cash Offer!"}
      </button>
      <p className="text-center text-xs text-muted">
        Written offer within 24 hours · No fees · No obligation
      </p>
    </form>
  );
}
