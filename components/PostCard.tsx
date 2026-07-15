import Link from "next/link";

export function PostCard({
  post,
}: {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    publishedAt?: Date | null;
    category?: { name: string; slug: string } | null;
  };
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow hover:shadow-lift">
      {post.category && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
          {post.category.name}
        </p>
      )}
      <h3 className="mt-3 text-lg font-bold leading-snug">
        <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-navy">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <p className="mt-5 text-sm font-semibold text-navy">Read the guide →</p>
    </article>
  );
}
