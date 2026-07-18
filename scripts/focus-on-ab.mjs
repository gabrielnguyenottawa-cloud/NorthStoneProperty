// Unpublish BC and NS provinces (city pages stay reachable, just unlinked).
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const res = await prisma.province.updateMany({
  where: { code: { in: ["BC", "NS"] } },
  data: { published: false },
});
console.log(`unpublished ${res.count} provinces (BC, NS)`);
await prisma.$disconnect();
