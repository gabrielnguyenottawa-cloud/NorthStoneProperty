import type { Metadata } from "next";
import { Source_Serif_4, Figtree } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | We Buy Houses Across Canada — Fair Cash Offers in 24 Hours`,
    template: `%s | ${site.name}`,
  },
  description:
    "Sell your house fast to Canada's trusted direct home buyer. Fair cash offers in 24 hours, close in as little as 14 days. No fees, no commissions, no repairs. Serving Ontario, BC, Alberta & Nova Scotia.",
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${serif.variable} ${figtree.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
