import type { Metadata } from "next";

export const SITE_NAME = "freeResume";
export const SITE_TAGLINE = "Free Resume Builder";
export const SITE_DESCRIPTION =
  "Build a professional, ATS-friendly resume for free. Live preview, one-click PDF download, real-time ATS parse-rate checker, and auto-save — no sign-up required.";
export const SITE_KEYWORDS = [
  "free resume builder",
  "resume builder online free",
  "ATS friendly resume",
  "ATS resume checker",
  "PDF resume maker",
  "create resume online",
  "resume maker",
  "CV builder free",
  "professional resume template",
  "resume parser",
  "job application resume",
  "freeResume",
];

export const PRODUCTION_SITE_URL = "https://freee-resume.vercel.app";

export const AUTHOR = {
  name: "Md Hasib Talukder",
  linkedin: "https://www.linkedin.com/in/hasibmuhammad",
};

/** Production URL — defaults to https://freee-resume.vercel.app */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // On production deploys, always use the canonical domain — VERCEL_URL is the
  // per-deployment hash URL and would poison canonicals/sitemap if used here.
  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }
  return "http://localhost:3000";
}

export function absoluteUrl(path = ""): string {
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} — Free ATS-Friendly Resume Builder Online`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR.name, url: AUTHOR.linkedin }],
  creator: AUTHOR.name,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free ATS-Friendly Resume Builder Online`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free ATS-Friendly Resume Builder`,
    description: SITE_DESCRIPTION,
    creator: `@${AUTHOR.name.replace(/\s+/g, "")}`,
  },
  alternates: {
    canonical: getSiteUrl(),
  },
  other: {
    "apple-mobile-web-app-title": SITE_NAME,
  },
};

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
