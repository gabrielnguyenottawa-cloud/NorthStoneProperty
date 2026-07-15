const steps = [
  {
    title: "Tell us about your property",
    body: "Two minutes online or one phone call. Address, condition, and your timeline — that's all we need to start.",
  },
  {
    title: "Receive a written cash offer",
    body: "Within 24 hours we present a firm offer and walk you through exactly how we calculated it. No conditions on financing or inspection.",
  },
  {
    title: "Close on the date you choose",
    body: "As fast as 14 days or as far out as you need. Funds arrive through your own lawyer's trust account. Leave behind anything you don't want.",
  },
];

/** The three-step offer rail — the site's signature process element.
 *  Numbered because the content genuinely is a sequence. */
export function ProcessSteps() {
  return (
    <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
      <div
        aria-hidden="true"
        className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-line lg:block"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-stone bg-white font-[family-name:var(--font-display)] text-lg font-bold text-ink">
            {i + 1}
          </span>
          <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
          <p className="mt-2.5 leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
