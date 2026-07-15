import { prisma } from "@/lib/prisma";
import { addTestimonial, deleteTestimonial } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Testimonials</h1>

      <div className="divide-y divide-line rounded-2xl border border-line bg-white shadow-soft">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 px-6 py-4">
            <div>
              <p className="font-semibold text-ink">
                {t.name} <span className="font-normal text-muted">· {t.location} · {"★".repeat(t.rating)}</span>
                {t.featured && <span className="ml-2 rounded-full bg-navy-tint px-2 py-0.5 text-xs font-medium text-navy-deep">Featured on homepage</span>}
              </p>
              <p className="mt-1 text-sm text-muted">"{t.quote}"</p>
            </div>
            <form action={deleteTestimonial}>
              <input type="hidden" name="id" value={t.id} />
              <button className="text-sm text-red-600 hover:underline">Delete</button>
            </form>
          </div>
        ))}
      </div>

      <form action={addTestimonial} className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-bold">Add testimonial</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="name">Name</label>
            <input id="name" name="name" required className={input} placeholder="Diane M." />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="location">Location</label>
            <input id="location" name="location" required className={input} placeholder="Ottawa, ON" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="rating">Rating</label>
            <select id="rating" name="rating" defaultValue="5" className={input}>
              {[5, 4, 3].map((n) => <option key={n} value={n}>{n} stars</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="quote">Quote</label>
          <textarea id="quote" name="quote" rows={3} required className={input} />
        </div>
        <label className="flex items-center gap-2 text-sm text-body">
          <input type="checkbox" name="featured" className="h-4 w-4" /> Feature on homepage
        </label>
        <button className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep">
          Add testimonial
        </button>
      </form>
    </div>
  );
}
