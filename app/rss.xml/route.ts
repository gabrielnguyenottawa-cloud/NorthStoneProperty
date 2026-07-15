import { getPublishedPosts } from "@/lib/queries";
import { absoluteUrl, site } from "@/lib/site";

export const revalidate = 900;

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getPublishedPosts(50).catch(() => []);

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${(post.publishedAt ?? post.createdAt).toUTCString()}</pubDate>
      ${post.category ? `<category>${escapeXml(post.category.name)}</category>` : ""}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Home Selling Guides</title>
    <link>${site.url}</link>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
    <description>Plain-language Canadian guides on selling a house fast, probate, taxes, tenants, and more.</description>
    <language>en-ca</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
