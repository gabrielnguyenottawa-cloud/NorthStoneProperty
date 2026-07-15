import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getCategory } from "@/lib/queries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/PostCard";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";

export const revalidate = 900;

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => []);
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} — Guides & Articles`,
    description: `Practical Canadian home-selling guides in the ${category.name} category, from NorthStone Property.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Blog", path: "/blog" },
              { name: category.name, path: `/blog/category/${slug}` },
            ]}
          />
          <div className="mt-8">
            <SectionHeading eyebrow="Category" title={category.name} />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {category.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <CtaBand />
    </>
  );
}
