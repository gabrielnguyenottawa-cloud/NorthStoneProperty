import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema, leadSchema, quickLeadSchema, referralSchema } from "@/lib/leads";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // General contact message: no property attached.
  const isContact =
    typeof json === "object" && json !== null && (json as { contact?: unknown }).contact === true;

  if (isContact) {
    const parsed = contactSchema.safeParse(json);
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
        email: data.email || "",
        address: "",
        city: "",
        province: "Ontario",
        postalCode: "",
        propertyType: "Other",
        condition: "Needs minor work",
        timeline: "Just exploring",
        reason: "Contact form message",
        notes: `CONTACT MESSAGE: ${data.message}`,
        consent: true,
        sourcePath: data.sourcePath ?? null,
      },
    });
    await sendNotification(lead).catch((err) =>
      console.error("Lead email notification failed:", err)
    );
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  }

  // Referral program: a third party sends us a seller, earns $2,000 at closing.
  const isReferral =
    typeof json === "object" && json !== null && (json as { referral?: unknown }).referral === true;

  if (isReferral) {
    const parsed = referralSchema.safeParse(json);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first?.message ?? "Please check the form and try again." },
        { status: 422 }
      );
    }
    const data = parsed.data;
    const referrerBits = [data.referrerName, data.referrerPhone, data.referrerEmail]
      .filter(Boolean)
      .join(", ");
    const lead = await prisma.lead.create({
      data: {
        name: data.ownerName || "",
        phone: data.ownerPhone,
        email: "",
        address: data.address,
        city: data.city || "",
        province: "Ontario",
        postalCode: "",
        propertyType: "Other",
        condition: "Needs minor work",
        timeline: "As soon as possible",
        reason: "Referral",
        notes: `REFERRAL LEAD — referred by ${referrerBits}. $2,000 payable to referrer if the purchase closes.${data.notes ? ` Notes: ${data.notes}` : ""}`,
        consent: true,
        sourcePath: data.sourcePath ?? null,
      },
    });
    await sendNotification(lead).catch((err) =>
      console.error("Lead email notification failed:", err)
    );
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  }

  // Quick form: address + phone only, details gathered on the follow-up call.
  const isQuick =
    typeof json === "object" && json !== null && (json as { quick?: unknown }).quick === true;

  if (isQuick) {
    const parsed = quickLeadSchema.safeParse(json);
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
        name: "",
        phone: data.phone,
        email: "",
        address: data.address,
        city: data.city || "",
        province: data.province || "Ontario",
        postalCode: "",
        propertyType: "Other",
        condition: "Needs minor work",
        timeline: "As soon as possible",
        reason: "Quick form — ask on call",
        notes: "Quick form lead (address + phone only). Gather details on the call.",
        consent: true,
        sourcePath: data.sourcePath ?? null,
      },
    });
    await sendNotification(lead).catch((err) =>
      console.error("Lead email notification failed:", err)
    );
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
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
        `<tr><td style="padding:6px 12px;font-weight:600">${k}</td><td style="padding:6px 12px">${v || "—"}</td></tr>`
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
      subject: `New seller lead: ${lead.city || lead.address}, ${lead.province} — ${lead.timeline}`,
      html: `<h2>New seller lead</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table><p><a href="${site.url}/admin/leads">Open in the dashboard →</a></p>`,
    }),
  });
}
