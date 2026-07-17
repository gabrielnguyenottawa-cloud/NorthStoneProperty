/** Simplified logo: minimal house mark + wordmark.
 *  `reverse` renders white-on-navy for dark surfaces. */
export function Logo({ reverse = false }: { reverse?: boolean }) {
  const main = reverse ? "#ffffff" : "#081e34";
  const accent = reverse ? "#b8b1a7" : "#736c63";

  return (
    <span className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 32 32"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        {/* simple house silhouette with door notch */}
        <path
          d="M16 3.5 L29 14.5 V28.5 H19.5 V20.5 H12.5 V28.5 H3 V14.5 Z"
          fill={main}
        />
        {/* chimney */}
        <rect x="23.5" y="6" width="3.5" height="6" fill={accent} />
      </svg>
      <span className="leading-none">
        <span
          className="block font-display text-[1.35rem] font-bold tracking-tight"
          style={{ color: main }}
        >
          NorthStone
        </span>
        <span
          className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          Property
        </span>
      </span>
    </span>
  );
}
