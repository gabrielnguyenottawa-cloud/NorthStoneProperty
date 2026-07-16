// Publishes all unpublished Ontario cities.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const ontario = await prisma.province.findFirst({ where: { code: "ON" } });
const result = await prisma.city.updateMany({
  where: { provinceId: ontario.id, published: false },
  data: { published: true },
});
console.log(`published ${result.count} cities`);
const all = await prisma.city.findMany({ where: { provinceId: ontario.id, published: true }, orderBy: { name: "asc" } });
console.log(`Ontario now has ${all.length} live cities:`);
console.log(all.map(c => c.name).join(", "));
await prisma.$disconnect();
