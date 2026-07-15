import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const csvCell = (v: string | boolean | Date | null) => {
  const s = v === null ? "" : v instanceof Date ? v.toISOString() : String(v);
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "Received", "Status", "Name", "Phone", "Email", "Address", "City", "Province",
    "PostalCode", "PropertyType", "Condition", "Timeline", "Reason", "Notes", "SourcePage",
  ].join(",");

  const rows = leads.map((l) =>
    [
      l.createdAt, l.status, l.name, l.phone, l.email, l.address, l.city, l.province,
      l.postalCode, l.propertyType, l.condition, l.timeline, l.reason, l.notes, l.sourcePath,
    ].map(csvCell).join(",")
  );

  return new Response([header, ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
