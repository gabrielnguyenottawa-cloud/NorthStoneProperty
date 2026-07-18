"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const inputClass =
  "w-full rounded-lg border-2 border-line bg-white px-4 py-3.5 text-lg text-body placeholder:text-muted/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const labelClass = "mb-1.5 block font-bold text-ink";

export function ContactForm() {
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = { contact: true, ...data, sourcePath: `${pathname}#contact` };

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
      <div className="rounded-xl border border-line bg-white p-8 text-center shadow-soft">
        <p className="text-2xl font-extrabold text-ink">Message received!</p>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          A real person will get back to you within one business day — usually
          much sooner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input id="contact-name" name="name" required minLength={2} autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Phone Number</label>
          <input id="contact-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="(613) 555-0142" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email Address <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="contact-email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>Questions / Comments</label>
        <textarea id="contact-message" name="message" required minLength={5} rows={5} className={inputClass} placeholder="How can we help?" />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-navy px-8 py-4 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
