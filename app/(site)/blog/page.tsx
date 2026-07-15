import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getPublishedPosts } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 900; // blog refreshes more often

export const metadata = buildMetadata({
  title: "Home Selling Guides & Resources | The NorthStone Blog",
  description:
    "Plain-language Canadian guides on selling a house fast, probate, capital gains, tenants, foreclosure, and more — written for homeowners, not agents.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCategories()]);

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
          <div className="mt-8">
            <SectionHeading
              eyebrow="Homeowner resources"
              title="Guides for every kind of sale"
              lede="Everything we've learned buying hundreds of Canadian homes — probate, taxes, tenants, timing — written in plain language."
            />
          </div>
          {categories.length > 0 && (
            <nav aria-label="Blog categories" className="mt-8 flex flex-wrap gap-2.5">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-body transition-colors hover:border-navy/40 hover:text-navy"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <CtaBand />
    </>
  );
}
