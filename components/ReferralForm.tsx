"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-body placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

export function ReferralForm() {
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = { referral: true, ...data, sourcePath: `${pathname}#referral` };

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
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
        <p className="text-2xl font-bold text-ink">Referral received — thank you!</p>
        <p className="mt-3 leading-relaxed text-muted">
          We'll reach out to the homeowner within one business day and keep you
          posted. If we close on the property, your $2,000 referral payment is
          processed at closing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <fieldset>
        <legend className="mb-3 font-bold text-ink">About you</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="referrerName" className={labelClass}>Your name</label>
            <input id="referrerName" name="referrerName" required minLength={2} className={inputClass} placeholder="Alex Martin" />
          </div>
          <div>
            <label htmlFor="referrerPhone" className={labelClass}>Your phone</label>
            <input id="referrerPhone" name="referrerPhone" type="tel" required className={inputClass} placeholder="(613) 555-0142" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="referrerEmail" className={labelClass}>
            Your email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="referrerEmail" name="referrerEmail" type="email" className={inputClass} placeholder="alex@example.com" />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-bold text-ink">About the property</legend>
        <div>
          <label htmlFor="address" className={labelClass}>Property address</label>
          <input id="address" name="address" required minLength={4} className={inputClass} placeholder="123 Elm Street" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className={labelClass}>
              City <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="city" name="city" className={inputClass} placeholder="Ottawa" />
          </div>
          <div>
            <label htmlFor="ownerName" className={labelClass}>
              Owner's name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="ownerName" name="ownerName" className={inputClass} placeholder="Jane Tremblay" />
          </div>
          <div>
            <label htmlFor="ownerPhone" className={labelClass}>Owner's phone</label>
            <input id="ownerPhone" name="ownerPhone" type="tel" required className={inputClass} placeholder="(613) 555-0199" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="notes" className={labelClass}>
            Anything we should know? <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id="notes" name="notes" rows={3} className={inputClass} placeholder="Situation, condition, timeline…" />
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-navy px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Submit my referral"}
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Please only refer homeowners who've given you permission to share their
        information. By submitting you agree to be contacted about this
        referral.
      </p>
    </form>
  );
}
