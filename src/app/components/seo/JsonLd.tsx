import { FAQ_ITEMS } from "@/lib/faqContent";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/seo";

type JsonLdProps = {
  /** Include FAQ structured data (homepage). */
  includeFaq?: boolean;
};

export function JsonLd({ includeFaq = false }: JsonLdProps) {
  const siteUrl = absoluteUrl();

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.linkedin,
    },
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    description: SITE_DESCRIPTION,
    url: siteUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Live resume preview",
      "One-click PDF export",
      "ATS parse-rate checker",
      "Auto-save drafts",
      "No sign-up required",
    ],
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.linkedin,
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${SITE_NAME} — Free ATS-Friendly Resume Builder Online`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    isPartOf: { "@type": "WebSite", url: siteUrl, name: SITE_NAME },
    about: {
      "@type": "Thing",
      name: "Resume builder",
    },
  };

  const schemas: Record<string, unknown>[] = [website, softwareApp, webPage];

  if (includeFaq) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
