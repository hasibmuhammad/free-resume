import { pageMetadata, absoluteUrl, SITE_NAME } from "@/lib/seo";
import type { Metadata } from "next";
import { ResumeCheckerClient } from "./ResumeCheckerClient";

export const metadata: Metadata = pageMetadata({
  title: "Free ATS Resume Checker — Scan Any Resume Online",
  description:
    "Upload any resume PDF and get an instant ATS compatibility score with actionable fixes — contact parsing, section detection, keywords, and formatting. Free, private, no sign-up.",
  path: "/resume-checker",
});

function CheckerJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${SITE_NAME} ATS Resume Checker`,
    url: absoluteUrl("/resume-checker"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free ATS resume checker that scans a PDF resume in the browser and reports parse-rate, contact extraction, section structure, and content quality.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ResumeCheckerPage() {
  return (
    <>
      <CheckerJsonLd />
      <ResumeCheckerClient />
    </>
  );
}
