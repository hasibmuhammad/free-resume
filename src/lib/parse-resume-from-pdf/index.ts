import { readPdfFromBlob } from "@/lib/parse-resume-from-pdf/read-pdf";
import {
  groupTextItemsByPosition,
  isLikelyMultiColumn,
} from "@/lib/parse-resume-from-pdf/group-text-items-by-position";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { parseMultiColumnResume } from "@/lib/parse-resume-from-pdf/parse-multi-column";
import { detectSectionHeadingsInPlainText } from "@/lib/parse-resume-from-pdf/section-heading-detect";
import { ParsedResume } from "@/types/parsedResume";
import { TextItems } from "@/lib/parse-resume-from-pdf/types";

export interface ParseResumeResult {
  resume: ParsedResume;
  textItems: TextItems;
  lineCount: number;
  /** Sections identified by the layout parser (strict — used for ATS scoring). */
  structuredSectionNames: string[];
  /** Section keywords found anywhere in PDF text (informational only). */
  keywordHints: string[];
  isMultiColumn: boolean;
}

export async function parseResumeFromPdfBlob(
  blob: Blob
): Promise<ParseResumeResult> {
  const textItems = await readPdfFromBlob(blob);
  const multiColumn = isLikelyMultiColumn(textItems);
  const rawPlain = textItems.map((item) => item.text).join(" ");

  if (multiColumn) {
    const { resume, structuredSectionNames } =
      parseMultiColumnResume(textItems);
    const lines = groupTextItemsByPosition(textItems);

    return {
      resume,
      textItems,
      lineCount: lines.length,
      structuredSectionNames,
      keywordHints: detectSectionHeadingsInPlainText(rawPlain),
      isMultiColumn: true,
    };
  }

  const lines = groupTextItemsByPosition(textItems);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  return {
    resume,
    textItems,
    lineCount: lines.length,
    structuredSectionNames: Object.keys(sections),
    keywordHints: detectSectionHeadingsInPlainText(rawPlain),
    isMultiColumn: false,
  };
}
