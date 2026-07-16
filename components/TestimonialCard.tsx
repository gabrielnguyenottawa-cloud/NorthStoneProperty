export function TestimonialCard({
  name,
  location,
  quote,
  rating = 5,
}: {
  name: string;
  location: string;
  quote: string;
  rating?: number;
}) {
  const initials = name
    .split(" ")
    .filter((part) => /^[a-zA-Z]/.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
      <div aria-label={`${rating} out of 5 stars`} className="text-base text-stone">
        {"★".repeat(rating)}
        <span className="text-line">{"★".repeat(5 - rating)}</span>
      </div>
      <blockquote className="mt-4 flex-1 font-display text-[1.05rem] leading-relaxed text-body">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-tint font-semibold text-navy"
        >
          {initials}
        </span>
        <span>
          <span className="block font-semibold text-ink">{name}</span>
          <span className="block text-sm text-muted">{location}</span>
        </span>
      </figcaption>
    </figure>
  );
}
