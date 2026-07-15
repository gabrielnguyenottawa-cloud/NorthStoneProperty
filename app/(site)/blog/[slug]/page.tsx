import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, faqSchema } from "@/lib/schema";
import { getCitiesByRefs, getPost, getPublishedPosts, getRelatedPosts } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { FaqList } from "@/components/FaqList";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";
import { PostCard } from "@/components/PostCard";
import { CityCard } from "@/components/CityCard";

export const revalidate = 900;

export async function generateStaticParams() {
  const posts = await getPublishedPosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt.slice(0, 155),
    path: `/blog/${slug}`,
    type: "article",
    image: post.coverImage ?? undefined,
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [related, relatedCities] = await Promise.all([
    getRelatedPosts(post.id, post.categoryId),
    getCitiesByRefs(post.relatedCitySlugs),
  ]);

  const dateFmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "long" });

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.metaDescription ?? post.excerpt,
            path: `/blog/${slug}`,
            image: post.coverImage,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          ...(post.faqs.length ? [faqSchema(post.faqs)] : []),
        ]}
      />

      <article>
        <header className="bg-mist">
          <div className="mx-auto max-w-3xl px-4 pb-12 pt-8 sm:px-6">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                ...(post.category
                  ? [{ name: post.category.name, path: `/blog/category/${post.category.slug}` }]
                  : []),
                { name: post.title, path: `/blog/${slug}` },
              ]}
            />
            <h1 className="mt-8 text-3xl font-bold leading-[1.15] sm:text-[2.6rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
            <p className="mt-5 text-sm text-muted">
              {post.publishedAt && (
                <time dateTime={post.publishedAt.toISOString()}>
                  {dateFmt.format(post.publishedAt)}
                </time>
              )}
              {post.category && (
                <>
                  {" · "}
                  <Link href={`/blog/category/${post.category.slug}`} className="font-medium text-navy hover:underline">
                    {post.category.name}
                  </Link>
                </>
              )}
            </p>
          </div>
        </header>

        {post.coverImage && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              width={1200}
              height={630}
              priority
              className="mt-8 rounded-2xl shadow-soft"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Prose content={post.content} />

          {/* Inline CTA */}
          <aside className="mt-12 rounded-2xl border border-navy/20 bg-navy-tint p-7">
            <h2 className="text-xl font-bold">Weighing your options?</h2>
            <p className="mt-2 text-sm leading-relaxed text-body">
              A written cash offer gives you a real number to compare against —
              free, no-obligation, and valid whether you sell to us or not.
            </p>
            <Link
              href="/get-offer"
              className="mt-5 inline-block rounded-full bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-deep"
            >
              Get my free offer
            </Link>
          </aside>

          {post.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-6">
                <FaqList faqs={post.faqs} />
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Related cities (internal linking) */}
      {relatedCities.length > 0 && (
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold">Selling in one of these cities?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {relatedCities.map((c) => (
                <CityCard key={c.id} city={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
