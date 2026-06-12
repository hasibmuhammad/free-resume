import { ParsedResume } from "@/types/parsedResume";

export type AtsCheckStatus = "pass" | "warn" | "fail";

export type AtsCheckCategory = "format" | "contact" | "sections" | "content";

export const ATS_CATEGORY_LABELS: Record<AtsCheckCategory, string> = {
  format: "Format & parsing",
  contact: "Contact information",
  sections: "Section structure",
  content: "Content quality",
};

export const ATS_CATEGORY_ORDER: AtsCheckCategory[] = [
  "format",
  "contact",
  "sections",
  "content",
];

export interface AtsCheck {
  id: string;
  label: string;
  detail: string;
  status: AtsCheckStatus;
  weight: number;
  category?: AtsCheckCategory;
}

/** Category lookup for checks produced by the editor analyzer. */
const CHECK_CATEGORY_MAP: Record<string, AtsCheckCategory> = {
  "parse-rate": "format",
  "text-layer": "format",
  layout: "format",
  "parse-layout": "format",
  "unparsed-fields": "format",
  "name-readable": "contact",
  "name-structured": "contact",
  "email-readable": "contact",
  "email-structured": "contact",
  phone: "contact",
  summary: "sections",
  "experience-section": "sections",
  "education-section": "sections",
  "education-hidden": "sections",
  "skills-section": "sections",
  "skills-hidden": "sections",
  "projects-section": "sections",
  "missing-sections": "sections",
  "experience-entries": "content",
  "experience-dates": "content",
  "experience-bullets": "content",
  "experience-missing": "content",
  "skills-keywords": "content",
  "skills-missing": "content",
};

export function getCheckCategory(check: AtsCheck): AtsCheckCategory {
  return check.category ?? CHECK_CATEGORY_MAP[check.id] ?? "format";
}

export function groupChecksByCategory(
  checks: AtsCheck[]
): { category: AtsCheckCategory; label: string; checks: AtsCheck[] }[] {
  const statusRank = { fail: 0, warn: 1, pass: 2 };

  return ATS_CATEGORY_ORDER.map((category) => ({
    category,
    label: ATS_CATEGORY_LABELS[category],
    checks: checks
      .filter((check) => getCheckCategory(check) === category)
      .sort((a, b) => statusRank[a.status] - statusRank[b.status]),
  })).filter((group) => group.checks.length > 0);
}

export interface AtsReport {
  /** Primary metric: % of exported resume fields the parser structured (Enhancv-style). */
  score: number;
  parseRate: number;
  parsedFieldCount: number;
  totalFieldCount: number;
  missingRequiredCount?: number;
  checks: AtsCheck[];
  passCount: number;
  warnCount: number;
  failCount: number;
  /** Structured data extracted by the PDF parser (OpenResume algorithm). */
  parsed?: ParsedResume;
  textItemCount?: number;
  /** Section keys from the layout parser (strict). */
  sectionNames?: string[];
  /** @deprecated Use sectionNames — kept for compatibility */
  keywordHints?: string[];
  isMultiColumn?: boolean;
}

export type AtsAnalysisStatus = "idle" | "analyzing" | "error";

export function getAtsScoreLabel(score: number): string {
  if (score >= 85) return "Highly parseable";
  if (score >= 70) return "Good parse rate";
  if (score >= 50) return "Partially parsed";
  return "Low parse rate";
}

export function getAtsParseRateSummary(
  parseRate: number,
  parsedCount: number,
  totalCount: number,
  missingRequiredCount = 0
): string {
  if (totalCount === 0) {
    return "Add resume content to measure parse rate.";
  }
  const base = `Parsed ${parsedCount} of ${totalCount} fields (${parseRate}%) using an ATS-style PDF parser.`;
  if (missingRequiredCount > 0) {
    return `${base} ${missingRequiredCount} required section${missingRequiredCount === 1 ? "" : "s"} missing from your PDF.`;
  }
  return base;
}

export function getAtsScoreColor(score: number): {
  ring: string;
  text: string;
  bg: string;
  bar: string;
} {
  if (score >= 85) {
    return {
      ring: "stroke-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      bar: "bg-emerald-500",
    };
  }
  if (score >= 70) {
    return {
      ring: "stroke-brand-500",
      text: "text-brand-600 dark:text-brand-400",
      bg: "bg-brand-500/10",
      bar: "bg-brand-500",
    };
  }
  if (score >= 50) {
    return {
      ring: "stroke-amber-500",
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      bar: "bg-amber-500",
    };
  }
  return {
    ring: "stroke-red-500",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10",
    bar: "bg-red-500",
  };
}

export const EMPTY_ATS_REPORT: AtsReport = {
  score: 0,
  parseRate: 0,
  parsedFieldCount: 0,
  totalFieldCount: 0,
  missingRequiredCount: 0,
  checks: [],
  passCount: 0,
  warnCount: 0,
  failCount: 0,
};
