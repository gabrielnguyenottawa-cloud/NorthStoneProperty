import { prisma } from "@/lib/prisma";
import { updateLeadStatus } from "../actions";

export const dynamic = "force-dynamic";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "OFFER_MADE", "CLOSED", "ARCHIVED"] as const;

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  const fmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Seller leads</h1>
        <a href="/admin/leads/export" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-navy/40">
          Export CSV
        </a>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3.5">Received</th>
              <th className="px-4 py-3.5">Name & contact</th>
              <th className="px-4 py-3.5">Property</th>
              <th className="px-4 py-3.5">Condition / timeline / reason</th>
              <th className="px-4 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="whitespace-nowrap px-4 py-3.5 text-muted">{fmt.format(lead.createdAt)}</td>
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-ink">{lead.name}</p>
                  <p className="text-muted">{lead.phone}</p>
                  <p className="text-muted">{lead.email}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p>{lead.address}</p>
                  <p className="text-muted">{lead.city}, {lead.province} {lead.postalCode}</p>
                  <p className="text-muted">{lead.propertyType}</p>
                </td>
                <td className="px-4 py-3.5 text-muted">
                  <p>{lead.condition}</p>
                  <p>{lead.timeline}</p>
                  <p>{lead.reason}</p>
                  {lead.notes && <p className="mt-1 max-w-[240px] text-xs italic">"{lead.notes}"</p>}
                </td>
                <td className="px-4 py-3.5">
                  <form action={updateLeadStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={lead.id} />
                    <select name="status" defaultValue={lead.status} className="rounded-lg border border-line px-2 py-1.5 text-xs">
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <button className="text-xs font-semibold text-navy hover:underline">Save</button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-muted">No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
