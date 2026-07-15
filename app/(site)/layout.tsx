import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ExitIntent } from "@/components/ExitIntent";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyCta />
      <ExitIntent />
    </>
  );
}
