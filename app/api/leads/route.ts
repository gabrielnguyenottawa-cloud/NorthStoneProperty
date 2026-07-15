import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/leads";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Please check the form and try again." },
      { status: 422 }
    );
  }

  const data = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      province: data.province,
      postalCode: data.postalCode.toUpperCase(),
      propertyType: data.propertyType,
      condition: data.condition,
      timeline: data.timeline,
      reason: data.reason,
      notes: data.notes || null,
      consent: data.consent,
      sourcePath: data.sourcePath ?? null,
    },
  });

  // Email notification — best-effort; the lead is already stored.
  await sendNotification(lead).catch((err) =>
    console.error("Lead email notification failed:", err)
  );

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

async function sendNotification(lead: {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  propertyType: string;
  condition: string;
  timeline: string;
  reason: string;
  notes: string | null;
  sourcePath: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_TO;
  if (!apiKey || !to) return;

  const rows = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Property", `${lead.address}, ${lead.city}, ${lead.province} ${lead.postalCode}`],
    ["Type", lead.propertyType],
    ["Condition", lead.condition],
    ["Timeline", lead.timeline],
    ["Reason", lead.reason],
    ["Notes", lead.notes ?? "—"],
    ["Source page", lead.sourcePath ?? "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600">${k}</td><td style="padding:6px 12px">${v}</td></tr>`
    )
    .join("");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_NOTIFICATION_FROM ?? `Leads <leads@${new URL(site.url).hostname}>`,
      to: [to],
      subject: `New seller lead: ${lead.city}, ${lead.province} — ${lead.timeline}`,
      html: `<h2>New seller lead</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table><p><a href="${site.url}/admin/leads">Open in the dashboard →</a></p>`,
    }),
  });
}
