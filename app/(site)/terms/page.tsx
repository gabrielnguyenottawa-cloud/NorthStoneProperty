import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Prose } from "@/components/Prose";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the NorthStone Property website and offer-request services.",
  path: "/terms",
});

const content = `
_Last updated: July 2026_

## Use of this website

This website is provided for general information about our direct home-buying services. By using it, you agree to these terms.

## Not professional advice

Content on this website — including blog articles and guides — is general information, not legal, tax, or financial advice. Real estate, probate, foreclosure, and tax rules vary by province and by situation. Always obtain independent professional advice before making decisions about your property.

## Offers

Any offer to purchase a property becomes binding only when set out in a written purchase agreement signed by both parties. Website content, estimates, and verbal discussions do not constitute an offer capable of acceptance.

## No agency relationship

We are professional home buyers purchasing for our own account. We are not acting as your real estate agent, and no fiduciary relationship is created by your use of this website or by requesting an offer.

## Intellectual property

All content on this website is owned by NorthStone Property Inc. and may not be reproduced without permission.

## Limitation of liability

To the maximum extent permitted by law, we are not liable for losses arising from reliance on website content. Your sole protection in a transaction is the written purchase agreement, reviewed by your own independent lawyer.

## Governing law

These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.
`;

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Breadcrumbs items={[{ name: "Terms of service", path: "/terms" }]} />
      <h1 className="mt-8 text-4xl font-bold">Terms of Service</h1>
      <div className="mt-8">
        <Prose content={content} />
      </div>
    </div>
  );
}
