import type { Line } from "@/lib/parse-resume-from-pdf/types";

/** Strip spaces/punctuation so letter-spaced PDF titles (E X P E R I E N C E) match. */
export function collapsePdfText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const PDF_SECTION_KEYWORDS = [
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "summary", label: "Summary" },
] as const;

export function textContainsSectionKeyword(
  text: string,
  keyword: string
): boolean {
  const collapsed = collapsePdfText(text);
  const key = collapsePdfText(keyword);
  return collapsed.includes(key);
}

export function getLineCollapsedText(line: Line): string {
  return collapsePdfText(line.map((item) => item.text).join(""));
}

export function getKnownSectionHeadingFromLine(line: Line): string | null {
  const collapsed = getLineCollapsedText(line);
  if (!collapsed) return null;

  for (const { key, label } of PDF_SECTION_KEYWORDS) {
    if (collapsed === key) return label;
    if (collapsed.includes(key) && collapsed.length <= key.length + 12) {
      return label;
    }
  }
  return null;
}

export function detectSectionHeadingsInPlainText(rawText: string): string[] {
  const collapsed = collapsePdfText(rawText);
  return PDF_SECTION_KEYWORDS.filter(({ key }) => collapsed.includes(key)).map(
    ({ label }) => label
  );
}
