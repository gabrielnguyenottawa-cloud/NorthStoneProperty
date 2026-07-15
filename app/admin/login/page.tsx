"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });
    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-lift">
        <h1 className="text-2xl font-bold">Admin sign in</h1>
        <label className="mt-6 block text-sm font-medium text-ink" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email"
          className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20" />
        <label className="mt-4 block text-sm font-medium text-ink" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password"
          className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20" />
        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-deep disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
