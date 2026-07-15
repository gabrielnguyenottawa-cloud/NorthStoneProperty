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
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
      <div aria-label={`${rating} out of 5 stars`} className="text-stone">
        {"★".repeat(rating)}
        <span className="text-line">{"★".repeat(5 - rating)}</span>
      </div>
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-body">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <span className="font-semibold text-ink">{name}</span>
        <span className="text-muted"> · {location}</span>
      </figcaption>
    </figure>
  );
}
