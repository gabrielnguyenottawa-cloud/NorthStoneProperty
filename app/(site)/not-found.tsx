import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="eyebrow justify-center">404</p>
      <h1 className="mt-4 text-4xl font-bold">This page has moved on</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        The page you're looking for doesn't exist — but your next step probably does.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="rounded-full bg-navy px-7 py-3.5 font-semibold text-white hover:bg-navy-deep">
          Back to home
        </Link>
        <Link href="/get-offer" className="rounded-full border border-line px-7 py-3.5 font-semibold text-ink hover:border-navy/40">
          Get a cash offer
        </Link>
      </div>
    </section>
  );
}
