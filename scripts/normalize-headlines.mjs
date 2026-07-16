// Clears templated heroHeadline values so the code-level default applies.
// Custom headlines (anything not matching the old template) are left alone.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const cities = await prisma.city.findMany({ select: { id: true, name: true, heroHeadline: true } });
let cleared = 0;
for (const c of cities) {
  if (c.heroHeadline === `Sell Your House Fast in ${c.name}`) {
    await prisma.city.update({ where: { id: c.id }, data: { heroHeadline: null } });
    cleared++;
  }
}
console.log(`cleared ${cleared} templated headlines (custom ones untouched)`);
await prisma.$disconnect();
