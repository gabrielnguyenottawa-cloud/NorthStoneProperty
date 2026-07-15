import { prisma } from "./prisma";

/** Data-access layer. All public pages read through these helpers so
 *  caching / ISR behaviour stays in one place. */

export const cityPath = (provinceSlug: string, citySlug: string) =>
  `/sell-your-house-fast/${provinceSlug}/${citySlug}`;

export function getProvincesWithCities() {
  return prisma.province.findMany({
    where: { published: true },
    orderBy: { name: "asc" },
    include: {
      cities: { where: { published: true }, orderBy: { name: "asc" } },
    },
  });
}

export function getCity(provinceSlug: string, citySlug: string) {
  return prisma.city.findFirst({
    where: { slug: citySlug, published: true, province: { slug: provinceSlug } },
    include: {
      province: true,
      faqs: { orderBy: { sortOrder: "asc" } },
      testimonials: { orderBy: { createdAt: "desc" }, take: 3 },
    },
  });
}

/** Related cities = other cities in the same province (internal linking). */
export function getRelatedCities(provinceId: string, excludeCityId: string, take = 6) {
  return prisma.city.findMany({
    where: { provinceId, published: true, id: { not: excludeCityId } },
    include: { province: true },
    orderBy: { name: "asc" },
    take,
  });
}

export function getPublishedPosts(take?: number) {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    include: { category: true },
    ...(take ? { take } : {}),
  });
}

export function getPost(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
    include: { category: true, faqs: { orderBy: { sortOrder: "asc" } } },
  });
}

/** Related articles = same category first, then most recent. */
export async function getRelatedPosts(postId: string, categoryId?: string | null, take = 3) {
  const sameCategory = categoryId
    ? await prisma.blogPost.findMany({
        where: {
          status: "PUBLISHED",
          publishedAt: { lte: new Date() },
          categoryId,
          id: { not: postId },
        },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
        take,
      })
    : [];
  if (sameCategory.length >= take) return sameCategory;
  const fill = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: new Date() },
      id: { notIn: [postId, ...sameCategory.map((p) => p.id)] },
    },
    orderBy: { publishedAt: "desc" },
    include: { category: true },
    take: take - sameCategory.length,
  });
  return [...sameCategory, ...fill];
}

/** Resolve "province-slug/city-slug" refs stored on a post into City rows. */
export async function getCitiesByRefs(refs: string[]) {
  if (!refs.length) return [];
  const pairs = refs
    .map((r) => r.split("/"))
    .filter((p) => p.length === 2)
    .map(([provinceSlug, citySlug]) => ({ provinceSlug, citySlug }));
  const cities = await prisma.city.findMany({
    where: {
      published: true,
      OR: pairs.map((p) => ({ slug: p.citySlug, province: { slug: p.provinceSlug } })),
    },
    include: { province: true },
  });
  return cities;
}

export function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
        orderBy: { publishedAt: "desc" },
        include: { category: true },
      },
    },
  });
}

export function getSituations() {
  return prisma.situationPage.findMany({
    where: { published: true },
    orderBy: { title: "asc" },
  });
}

export function getSituation(slug: string) {
  return prisma.situationPage.findFirst({
    where: { slug, published: true },
    include: { faqs: { orderBy: { sortOrder: "asc" } } },
  });
}

export function getGlobalFaqs() {
  return prisma.faq.findMany({ where: { isGlobal: true }, orderBy: { sortOrder: "asc" } });
}

export function getTestimonials(featuredOnly = false) {
  return prisma.testimonial.findMany({
    where: featuredOnly ? { featured: true } : {},
    orderBy: { createdAt: "desc" },
  });
}
