const rows = [
  { label: "Time to a firm sale", us: "24 hours to a written offer", them: "30–90+ days on market" },
  { label: "Time to close", us: "14 days — or your chosen date", them: "30–60 days after an accepted offer" },
  { label: "Commissions", us: "None", them: "Typically 4–5% + HST" },
  { label: "Repairs & staging", us: "Sell completely as-is", them: "Usually required to compete" },
  { label: "Showings", us: "One visit", them: "Ongoing showings & open houses" },
  { label: "Risk of deal collapse", us: "None — cash, no conditions", them: "Financing & inspection conditions" },
  { label: "Best for", us: "Speed, certainty, as-is properties", them: "Move-in-ready homes, flexible timelines" },
];

/** Us vs. listing-with-an-agent table — used on the homepage and /why-choose-us. */
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line shadow-soft">
      <table className="w-full min-w-[560px] border-collapse bg-white text-left text-sm">
        <thead>
          <tr className="bg-ink text-white">
            <th scope="col" className="px-5 py-4 font-semibold"> </th>
            <th scope="col" className="px-5 py-4 font-semibold">Selling to NorthStone</th>
            <th scope="col" className="px-5 py-4 font-semibold">Listing with an agent</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 ? "bg-mist" : "bg-white"}>
              <th scope="row" className="px-5 py-4 font-semibold text-ink">{row.label}</th>
              <td className="px-5 py-4 font-medium text-navy-deep">{row.us}</td>
              <td className="px-5 py-4 text-muted">{row.them}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
