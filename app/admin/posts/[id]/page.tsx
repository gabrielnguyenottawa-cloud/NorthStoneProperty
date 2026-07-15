import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostEditor } from "@/components/admin/PostEditor";
import { savePost } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id }, include: { category: true } });
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit post</h1>
      <PostEditor
        action={savePost}
        post={{ ...post, categoryName: post.category?.name }}
      />
    </div>
  );
}
