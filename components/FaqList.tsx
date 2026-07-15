/** Accessible accordion built on native <details>/<summary> — no JS needed.
 *  Pair with faqSchema() JSON-LD on the page. */
export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="text-xl leading-none text-navy transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
