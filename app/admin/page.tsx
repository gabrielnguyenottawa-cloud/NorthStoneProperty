import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [leadsTotal, leads30, leadsNew, postsPublished, postsDraft, recentLeads, topSources] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: since30 } } }),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: { in: ["DRAFT", "SCHEDULED"] } } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
      prisma.lead.groupBy({
        by: ["sourcePath"],
        _count: { _all: true },
        orderBy: { _count: { sourcePath: "desc" } },
        take: 6,
      }),
    ]);

  const stats = [
    { label: "Leads — last 30 days", value: leads30 },
    { label: "New (uncontacted) leads", value: leadsNew },
    { label: "Leads all-time", value: leadsTotal },
    { label: "Published posts", value: postsPublished },
    { label: "Drafts & scheduled", value: postsDraft },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
            <p className="text-3xl font-bold text-ink">{s.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm font-semibold text-navy hover:underline">View all →</Link>
          </div>
          <ul className="mt-4 divide-y divide-line text-sm">
            {recentLeads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between gap-4 py-3">
                <span>
                  <span className="font-semibold text-ink">{lead.name}</span>
                  <span className="text-muted"> · {lead.city}, {lead.province} · {lead.timeline}</span>
                </span>
                <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium">{lead.status}</span>
              </li>
            ))}
            {recentLeads.length === 0 && <li className="py-3 text-muted">No leads yet — they'll appear here the moment a form is submitted.</li>}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold">Converting pages</h2>
          <p className="mt-1 text-xs text-muted">Which page + placement each lead came from.</p>
          <ul className="mt-4 space-y-2 text-sm">
            {topSources.map((s) => (
              <li key={s.sourcePath ?? "unknown"} className="flex justify-between gap-3">
                <span className="truncate text-body">{s.sourcePath ?? "(unknown)"}</span>
                <span className="font-semibold text-ink">{s._count._all}</span>
              </li>
            ))}
            {topSources.length === 0 && <li className="text-muted">No data yet.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
