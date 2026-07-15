import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { cityPath, getProvincesWithCities, getPublishedPosts, getSituations, getCategories } from "@/lib/queries";

export const revalidate = 3600;

const staticRoutes = [
  "/", "/about", "/how-it-works", "/why-choose-us", "/cities", "/situations",
  "/blog", "/faq", "/testimonials", "/contact", "/careers", "/get-offer",
  "/privacy-policy", "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [provinces, posts, situations, categories] = await Promise.all([
    getProvincesWithCities().catch(() => []),
    getPublishedPosts().catch(() => []),
    getSituations().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...provinces.flatMap((p) =>
      p.cities.map((c) => ({
        url: absoluteUrl(cityPath(p.slug, c.slug)),
        lastModified: c.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }))
    ),
    ...situations.map((s) => ({
      url: absoluteUrl(`/situations/${s.slug}`),
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: absoluteUrl(`/blog/category/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
