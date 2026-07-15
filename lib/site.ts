export const site = {
  name: "NorthStone Property",
  legalName: "NorthStone Property Inc.",
  tagline: "Real estate solutions built on trust",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.northstoneproperty.ca",
  phone: "1-800-555-0139",
  phoneHref: "tel:+18005550139",
  email: "offers@northstoneproperty.ca",
  address: {
    streetAddress: "100 Queen Street, Suite 800",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    postalCode: "K1P 1J9",
    addressCountry: "CA",
  },
  social: {
    facebook: "https://www.facebook.com/northstoneproperty",
    linkedin: "https://www.linkedin.com/company/northstone-property",
    instagram: "https://www.instagram.com/northstoneproperty",
  },
  twitterHandle: "@northstoneprop",
} as const;

export const absoluteUrl = (path: string) =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
