import { absoluteUrl, site } from "./site";

/** JSON-LD builders. Each returns a plain object rendered via <JsonLd>. */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/logo.png"),
    telephone: site.phone,
    email: site.email,
    address: { "@type": "PostalAddress", ...site.address },
    sameAs: Object.values(site.social),
  };
}

export function localBusinessSchema(city?: {
  name: string;
  provinceCode: string;
  latitude?: number | null;
  longitude?: number | null;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": city ? absoluteUrl(`${city.path}#business`) : absoluteUrl("/#business"),
    name: city ? `${site.name} — ${city.name}` : site.name,
    url: city ? absoluteUrl(city.path) : site.url,
    telephone: site.phone,
    priceRange: "$$",
    address: { "@type": "PostalAddress", ...site.address },
    areaServed: city
      ? { "@type": "City", name: `${city.name}, ${city.provinceCode}` }
      : { "@type": "Country", name: "Canada" },
    ...(city?.latitude && city?.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: city.latitude, longitude: city.longitude } }
      : {}),
    parentOrganization: { "@id": absoluteUrl("/#organization") },
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ?? absoluteUrl("/og-default.jpg"),
    datePublished: post.publishedAt?.toISOString(),
    dateModified: (post.updatedAt ?? post.publishedAt)?.toISOString(),
    mainEntityOfPage: absoluteUrl(post.path),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
