"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const input =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";
const label = "block text-sm font-medium text-ink";

type PostValues = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  targetKeyword?: string | null;
  status?: string;
  scheduledFor?: Date | null;
  relatedCitySlugs?: string[];
  categoryName?: string;
};

export function PostEditor({
  action,
  post = {},
}: {
  action: (formData: FormData) => Promise<void>;
  post?: PostValues;
}) {
  const [status, setStatus] = useState(post.status ?? "DRAFT");
  const [coverImage, setCoverImage] = useState(post.coverImage ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /** Uploads to the public Supabase Storage bucket `images`. */
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const supabase = createSupabaseBrowserClient();
    const path = `blog/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: false });
    if (error) {
      setUploadError("Upload failed — check that the 'images' storage bucket exists and is public.");
    } else {
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      setCoverImage(data.publicUrl);
    }
    setUploading(false);
  }

  return (
    <form action={action} className="space-y-6">
      {post.id && <input type="hidden" name="id" value={post.id} />}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-soft">
          <div>
            <label className={label} htmlFor="title">Title</label>
            <input id="title" name="title" required defaultValue={post.title} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="excerpt">Excerpt <span className="font-normal text-muted">(shown in cards and used as the default meta description)</span></label>
            <textarea id="excerpt" name="excerpt" rows={3} required defaultValue={post.excerpt} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="content">Content <span className="font-normal text-muted">(Markdown)</span></label>
            <textarea id="content" name="content" rows={22} required defaultValue={post.content} className={`${input} font-mono text-xs leading-relaxed`} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="font-bold">Publishing</h2>
            <div>
              <label className={label} htmlFor="status">Status</label>
              <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} className={input}>
                <option value="DRAFT">Draft</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            {status === "SCHEDULED" && (
              <div>
                <label className={label} htmlFor="scheduledFor">Publish at</label>
                <input id="scheduledFor" name="scheduledFor" type="datetime-local" className={input}
                  defaultValue={post.scheduledFor ? new Date(post.scheduledFor).toISOString().slice(0, 16) : ""} />
              </div>
            )}
            <div>
              <label className={label} htmlFor="category">Category</label>
              <input id="category" name="category" defaultValue={post.categoryName} className={input} placeholder="Selling Guides" />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="font-bold">Cover image</h2>
            <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
            {uploading && <p className="text-sm text-muted">Uploading…</p>}
            {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
            {coverImage && <img src={coverImage} alt="" className="rounded-lg border border-line" />}
            <input type="hidden" name="coverImage" value={coverImage} />
            <div>
              <label className={label} htmlFor="coverImageAlt">Image alt text</label>
              <input id="coverImageAlt" name="coverImageAlt" defaultValue={post.coverImageAlt ?? ""} className={input} />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h2 className="font-bold">SEO</h2>
            <div>
              <label className={label} htmlFor="targetKeyword">Target keyword <span className="font-normal text-muted">(one per article)</span></label>
              <input id="targetKeyword" name="targetKeyword" defaultValue={post.targetKeyword ?? ""} className={input} placeholder="sell inherited house Toronto" />
            </div>
            <div>
              <label className={label} htmlFor="slug">URL slug</label>
              <input id="slug" name="slug" defaultValue={post.slug} className={input} placeholder="auto-generated from title" />
            </div>
            <div>
              <label className={label} htmlFor="metaTitle">Meta title</label>
              <input id="metaTitle" name="metaTitle" maxLength={70} defaultValue={post.metaTitle ?? ""} className={input} />
            </div>
            <div>
              <label className={label} htmlFor="metaDescription">Meta description</label>
              <textarea id="metaDescription" name="metaDescription" maxLength={160} rows={3} defaultValue={post.metaDescription ?? ""} className={input} />
            </div>
            <div>
              <label className={label} htmlFor="relatedCitySlugs">Related city pages <span className="font-normal text-muted">(comma-separated: ontario/ottawa, alberta/calgary)</span></label>
              <input id="relatedCitySlugs" name="relatedCitySlugs" defaultValue={post.relatedCitySlugs?.join(", ")} className={input} />
            </div>
          </div>

          <button className="w-full rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-deep">
            Save post
          </button>
        </div>
      </div>
    </form>
  );
}
