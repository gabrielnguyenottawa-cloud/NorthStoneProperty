import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How NorthStone Property collects, uses, and protects your personal information under PIPEDA.",
  path: "/privacy-policy",
});

const content = `
_Last updated: July 2026_

NorthStone Property Inc. ("we", "us") is committed to protecting your personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation.

## What we collect

When you request an offer or contact us, we collect the information you provide: your name, phone number, email address, property address, and details about the property and your selling situation. We also collect standard analytics data about how our website is used.

## How we use it

We use your information solely to evaluate your property, prepare and communicate an offer, complete a transaction if you accept, and improve our website. We contact you only about your inquiry unless you separately opt in to updates.

## What we never do

We never sell, rent, or trade your personal information to third parties. Seller information is shared only with the professionals required to complete a transaction you have agreed to — such as your lawyer and ours.

## Storage and security

Your data is stored on secure, access-controlled Canadian-compliant infrastructure. Access is limited to team members who need it to respond to your inquiry.

## Your rights

You may request access to, correction of, or deletion of your personal information at any time by emailing ${"privacy@northstoneproperty.ca"}. We respond to all requests within 30 days.

## Contact

Questions about this policy can be directed to our privacy officer at privacy@northstoneproperty.ca or by mail to ${site.address.streetAddress}, ${site.address.addressLocality}, ${site.address.addressRegion} ${site.address.postalCode}.
`;

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Breadcrumbs items={[{ name: "Privacy policy", path: "/privacy-policy" }]} />
      <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>
      <div className="mt-8">
        <Prose content={content} />
      </div>
    </div>
  );
}
