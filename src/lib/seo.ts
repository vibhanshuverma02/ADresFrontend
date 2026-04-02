import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://adresnetwork.iitr.ac.in/";
const SITE_NAME = "ADRES Network";
const DEFAULT_DESCRIPTION = "he ADRES network is built on a coordinated framework that connects knowledge, action, policy, and global collaboration. It brings together four core groups — the Feeder Group, State Climate Change Cells and SDMAs as Implementers, Policy Users, and External Resource partners — each playing a distinct role in reducing disaster risk and strengthening climate resilience. Research and expertise flow from Centres of Excellence through the Feeder Group, are translated into on-ground actions by Implementers, adopted and enforced through government ministries and agencies, and enhanced through collaboration with international organizations. This entire system is guided by a multidisciplinary advisory board, ensuring science-based decisions, policy relevance, sustainability, and national alignment. Together, the framework ensures that ideas do not stay on paper — they transform into real, measurable impact for communities and governments.";

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/ADRES-logo.png",
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}