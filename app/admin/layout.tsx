import Link from "next/link";

const nav = [
  { label: "Overview", href: "/admin" },
  { label: "Blog posts", href: "/admin/posts" },
  { label: "Leads", href: "/admin/leads" },
  { label: "City pages", href: "/admin/cities" },
  { label: "FAQs", href: "/admin/faqs" },
  { label: "Testimonials", href: "/admin/testimonials" },
];

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
        <aside className="hidden w-52 shrink-0 md:block">
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
            NorthStone <span className="text-stone">Admin</span>
          </p>
          <nav className="mt-6 space-y-1" aria-label="Admin">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-body hover:bg-white hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 border-t border-line pt-6">
            <Link href="/" className="block px-3 text-sm text-muted hover:text-navy">
              ← View site
            </Link>
            <form action="/admin/login/signout" method="post" className="mt-2 px-3">
              <button className="text-sm text-muted hover:text-navy">Sign out</button>
            </form>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
