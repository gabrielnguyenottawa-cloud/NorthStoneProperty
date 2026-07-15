import { prisma } from "@/lib/prisma";
import { addGlobalFaq, deleteFaq } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ where: { isGlobal: true }, orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Global FAQs</h1>
      <p className="text-sm text-muted">
        These appear on /faq with FAQPage structured data. City- and article-specific FAQs
        are managed on their own records.
      </p>

      <div className="divide-y divide-line rounded-2xl border border-line bg-white shadow-soft">
        {faqs.map((faq) => (
          <div key={faq.id} className="flex items-start justify-between gap-4 px-6 py-4">
            <div>
              <p className="font-semibold text-ink">{faq.question}</p>
              <p className="mt-1 text-sm text-muted">{faq.answer}</p>
            </div>
            <form action={deleteFaq}>
              <input type="hidden" name="id" value={faq.id} />
              <button className="text-sm text-red-600 hover:underline">Delete</button>
            </form>
          </div>
        ))}
      </div>

      <form action={addGlobalFaq} className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-bold">Add FAQ</h2>
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="question">Question</label>
          <input id="question" name="question" required className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="answer">Answer</label>
          <textarea id="answer" name="answer" rows={3} required className={input} />
        </div>
        <button className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep">
          Add FAQ
        </button>
      </form>
    </div>
  );
}
