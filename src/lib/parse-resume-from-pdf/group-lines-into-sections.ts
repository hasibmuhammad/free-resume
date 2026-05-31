import type { ParsedResumeKey } from "@/types/parsedResume";
import type {
  Line,
  Lines,
  ResumeSectionToLines,
} from "@/lib/parse-resume-from-pdf/types";
import {
  hasLetterAndIsAllUpperCase,
  hasOnlyLettersSpacesAmpersands,
  isBold,
} from "@/lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { getKnownSectionHeadingFromLine } from "@/lib/parse-resume-from-pdf/section-heading-detect";

export const PROFILE_SECTION: ParsedResumeKey = "profile";

export const groupLinesIntoSections = (lines: Lines) => {
  let sections: ResumeSectionToLines = {};
  let sectionName: string = PROFILE_SECTION;
  let sectionLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const knownHeading = getKnownSectionHeadingFromLine(line);
    const text = knownHeading ?? line[0]?.text.trim();

    if (isSectionTitle(line, i)) {
      sections[sectionName] = [...sectionLines];
      sectionName = text || sectionName;
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }

  if (sectionLines.length > 0) {
    sections[sectionName] = [...sectionLines];
  }

  return sections;
};

const SECTION_TITLE_KEYWORDS = [
  "experience",
  "education",
  "project",
  "skill",
  "job",
  "course",
  "summary",
  "award",
  "honor",
];

const isSectionTitle = (line: Line, lineNumber: number) => {
  if (getKnownSectionHeadingFromLine(line)) return true;

  const isFirstTwoLines = lineNumber < 2;
  const hasNoItemInLine = line.length === 0;
  if (isFirstTwoLines || hasNoItemInLine) {
    return false;
  }

  if (line.length === 1) {
    const textItem = line[0];
    if (isBold(textItem) && hasLetterAndIsAllUpperCase(textItem)) {
      return true;
    }

    const text = textItem.text.trim();
    const textHasAtMost2Words =
      text.split(" ").filter((s) => s !== "&").length <= 2;
    const startsWithCapitalLetter = /[A-Z]/.test(text.slice(0, 1));

    if (
      textHasAtMost2Words &&
      hasOnlyLettersSpacesAmpersands(textItem) &&
      startsWithCapitalLetter &&
      SECTION_TITLE_KEYWORDS.some((keyword) =>
        text.toLowerCase().includes(keyword)
      )
    ) {
      return true;
    }
  }

  return false;
};
