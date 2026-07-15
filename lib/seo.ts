import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path: string; // canonical path, e.g. "/blog/my-post"
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/** Central metadata builder — every page routes through this so titles,
 *  canonicals, OpenGraph, and Twitter cards stay consistent. */
export function buildMetadata(input: SeoInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image ?? absoluteUrl("/og-default.jpg");

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      locale: "en_CA",
      type: input.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      ...(input.type === "article" && {
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}
