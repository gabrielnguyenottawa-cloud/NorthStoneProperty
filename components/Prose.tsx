import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders CMS markdown with the site's long-form typography. */
export function Prose({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:tracking-tight prose-headings:text-ink prose-a:text-navy prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-li:marker:text-stone">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
