import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });

  const fmt = new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog posts</h1>
        <Link href="/admin/posts/new" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-deep">
          New post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3.5">Title</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Published / scheduled</th>
              <th className="px-5 py-3.5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-3.5 font-semibold text-ink">{post.title}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    post.status === "PUBLISHED" ? "bg-navy-tint text-navy-deep"
                    : post.status === "SCHEDULED" ? "bg-amber-50 text-amber-700"
                    : "bg-mist text-muted"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted">{post.category?.name ?? "—"}</td>
                <td className="px-5 py-3.5 text-muted">
                  {post.publishedAt ? fmt.format(post.publishedAt)
                    : post.scheduledFor ? `→ ${fmt.format(post.scheduledFor)}`
                    : "—"}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/posts/${post.id}`} className="font-semibold text-navy hover:underline">Edit</Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button className="text-red-600 hover:underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-muted">No posts yet. Write your first guide to start building topical authority.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
