/* Emits SQL INSERTs from prisma-style calls. Used only to generate supabase-setup.sql. */
import { randomUUID } from "crypto";

const statements: string[] = [];

const tableMap: Record<string, string> = {
  province: "Province",
  city: "City",
  category: "Category",
  blogPost: "BlogPost",
  situationPage: "SituationPage",
  faq: "Faq",
  testimonial: "Testimonial",
  lead: "Lead",
};

const q = (v: unknown): string => {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (v instanceof Date) return `'${v.toISOString()}'`;
  if (Array.isArray(v)) return `ARRAY[${v.map(q).join(",")}]::text[]`;
  return `'${String(v).replace(/'/g, "''")}'`;
};

const timestampCols: Record<string, string[]> = {
  Province: ["createdAt"],
  City: ["createdAt", "updatedAt"],
  Category: [],
  BlogPost: ["createdAt", "updatedAt"],
  SituationPage: ["createdAt", "updatedAt"],
  Faq: [],
  Testimonial: ["createdAt"],
  Lead: ["createdAt", "updatedAt"],
};

function insert(table: string, row: Record<string, unknown>) {
  const id = (row.id as string) ?? randomUUID();
  const now = new Date();
  const full: Record<string, unknown> = { id, ...row };
  for (const col of timestampCols[table] ?? []) {
    if (!(col in full)) full[col] = now;
  }
  const cols = Object.keys(full);
  statements.push(
    `INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(", ")}) VALUES (${cols
      .map((c) => q(full[c]))
      .join(", ")}) ON CONFLICT DO NOTHING;`
  );
  return { ...full, id };
}

function model(name: string) {
  const table = tableMap[name];
  return {
    upsert: async ({ create }: { where: unknown; update: unknown; create: Record<string, unknown> }) =>
      insert(table, create),
    create: async ({ data }: { data: Record<string, unknown> }) => insert(table, data),
    createMany: async ({ data }: { data: Record<string, unknown>[] }) => {
      data.forEach((row) => insert(table, row));
      return { count: data.length };
    },
    count: async () => 0, // always seed
  };
}

export class PrismaClient {
  province = model("province");
  city = model("city");
  category = model("category");
  blogPost = model("blogPost");
  situationPage = model("situationPage");
  faq = model("faq");
  testimonial = model("testimonial");
  async $disconnect() {
    const { writeFileSync } = await import("fs");
    writeFileSync("/tmp/seed-data.sql", statements.join("\n") + "\n");
    console.log(`Wrote ${statements.length} INSERT statements`);
  }
}
