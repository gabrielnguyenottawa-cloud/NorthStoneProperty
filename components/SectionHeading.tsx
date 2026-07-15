export function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-lg leading-relaxed text-muted">{lede}</p>}
    </div>
  );
}
