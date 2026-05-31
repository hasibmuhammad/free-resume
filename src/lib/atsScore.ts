import { ParsedResume } from "@/types/parsedResume";

export type AtsCheckStatus = "pass" | "warn" | "fail";

export interface AtsCheck {
  id: string;
  label: string;
  detail: string;
  status: AtsCheckStatus;
  weight: number;
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
