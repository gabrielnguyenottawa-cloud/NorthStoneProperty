import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const provinces = await prisma.province.findMany({ include: { cities: { orderBy: { name: "asc" } } } });
for (const p of provinces) {
  console.log(`${p.name} (${p.code}) published=${p.published}: ${p.cities.map(c => c.name + (c.published ? "" : "*")).join(", ")}`);
}
await prisma.$disconnect();
