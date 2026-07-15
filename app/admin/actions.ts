"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LeadStatus, PostStatus } from "@prisma/client";

/** Every action verifies the Supabase session server-side —
 *  middleware alone is not sufficient protection for mutations. */
async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/rss.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

// ---------- Blog posts ----------

export async function savePost(formData: FormData) {
  await requireAdmin();

  const id = (formData.get("id") as string) || null;
  const title = (formData.get("title") as string)?.trim();
  if (!title) throw new Error("Title is required");

  const status = (formData.get("status") as PostStatus) ?? "DRAFT";
  const scheduledForRaw = formData.get("scheduledFor") as string;
  const categoryName = ((formData.get("category") as string) ?? "").trim();

  let categoryId: string | null = null;
  if (categoryName) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(categoryName) },
      update: {},
      create: { name: categoryName, slug: slugify(categoryName) },
    });
    categoryId = category.id;
  }

  const data = {
    title,
    slug: slugify((formData.get("slug") as string)?.trim() || title),
    excerpt: ((formData.get("excerpt") as string) ?? "").trim(),
    content: ((formData.get("content") as string) ?? "").trim(),
    coverImage: ((formData.get("coverImage") as string) ?? "").trim() || null,
    coverImageAlt: ((formData.get("coverImageAlt") as string) ?? "").trim() || null,
    metaTitle: ((formData.get("metaTitle") as string) ?? "").trim() || null,
    metaDescription: ((formData.get("metaDescription") as string) ?? "").trim() || null,
    targetKeyword: ((formData.get("targetKeyword") as string) ?? "").trim() || null,
    relatedCitySlugs: ((formData.get("relatedCitySlugs") as string) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    categoryId,
    status,
    scheduledFor: status === "SCHEDULED" && scheduledForRaw ? new Date(scheduledForRaw) : null,
    publishedAt:
      status === "PUBLISHED"
        ? new Date()
        : status === "SCHEDULED" && scheduledForRaw
          ? new Date(scheduledForRaw)
          : null,
  };

  const post = id
    ? await prisma.blogPost.update({ where: { id }, data })
    : await prisma.blogPost.create({ data });

  revalidateBlog(post.slug);
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidateBlog(post.slug);
}

// ---------- Leads ----------

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as LeadStatus;
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

// ---------- Cities ----------

export async function toggleCityPublished(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const city = await prisma.city.findUniqueOrThrow({ where: { id }, include: { province: true } });
  await prisma.city.update({ where: { id }, data: { published: !city.published } });
  revalidatePath("/cities");
  revalidatePath(`/sell-your-house-fast/${city.province.slug}/${city.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/cities");
}

export async function saveCity(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const city = await prisma.city.update({
    where: { id },
    data: {
      heroHeadline: ((formData.get("heroHeadline") as string) ?? "").trim() || null,
      metaTitle: ((formData.get("metaTitle") as string) ?? "").trim() || null,
      metaDescription: ((formData.get("metaDescription") as string) ?? "").trim() || null,
      intro: ((formData.get("intro") as string) ?? "").trim(),
      marketInsights: ((formData.get("marketInsights") as string) ?? "").trim() || null,
      neighbourhoods: ((formData.get("neighbourhoods") as string) ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    },
    include: { province: true },
  });
  revalidatePath(`/sell-your-house-fast/${city.province.slug}/${city.slug}`);
  redirect("/admin/cities");
}

// ---------- FAQs ----------

export async function addGlobalFaq(formData: FormData) {
  await requireAdmin();
  const question = ((formData.get("question") as string) ?? "").trim();
  const answer = ((formData.get("answer") as string) ?? "").trim();
  if (!question || !answer) return;
  const count = await prisma.faq.count({ where: { isGlobal: true } });
  await prisma.faq.create({ data: { question, answer, isGlobal: true, sortOrder: count } });
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function deleteFaq(formData: FormData) {
  await requireAdmin();
  await prisma.faq.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

// ---------- Testimonials ----------

export async function addTestimonial(formData: FormData) {
  await requireAdmin();
  const name = ((formData.get("name") as string) ?? "").trim();
  const location = ((formData.get("location") as string) ?? "").trim();
  const quote = ((formData.get("quote") as string) ?? "").trim();
  if (!name || !location || !quote) return;
  await prisma.testimonial.create({
    data: {
      name,
      location,
      quote,
      rating: Number(formData.get("rating") ?? 5),
      featured: formData.get("featured") === "on",
    },
  });
  revalidatePath("/testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
}
