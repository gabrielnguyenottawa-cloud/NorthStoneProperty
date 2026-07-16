import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const c = await prisma.city.findFirst({ where: { slug: "kingston" }, include: { faqs: true } });
console.log(JSON.stringify({ name: c.name, slug: c.slug, metaTitle: c.metaTitle, heroHeadline: c.heroHeadline, intro: c.intro, neighbourhoods: c.neighbourhoods, lat: c.latitude, lng: c.longitude, faqCount: c.faqs.length, hasInsights: !!c.marketInsights }, null, 2));
await prisma.$disconnect();
