import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const cats = await prisma.category.findMany();
console.log("categories:", cats.map(c => `${c.name} (${c.slug})`).join(" | "));
const posts = await prisma.blogPost.findMany({ select: { title: true, slug: true, status: true, targetKeyword: true, publishedAt: true } });
for (const p of posts) console.log(`${p.status} | ${p.slug} | kw: ${p.targetKeyword}`);
await prisma.$disconnect();
