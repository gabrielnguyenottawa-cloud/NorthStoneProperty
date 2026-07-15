import { PostEditor } from "@/components/admin/PostEditor";
import { savePost } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New post</h1>
      <PostEditor action={savePost} />
    </div>
  );
}
