import { PROFILE_SECTION } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupTextItemsByPosition } from "@/lib/parse-resume-from-pdf/group-text-items-by-position";
import { partitionTextItemsForColumns } from "@/lib/parse-resume-from-pdf/column-layout";
import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { mergeParsedResumes } from "@/lib/parse-resume-from-pdf/merge-parsed-resume";
import type { ParsedResume } from "@/types/parsedResume";
import type { ResumeSectionToLines, TextItems } from "@/lib/parse-resume-from-pdf/types";

function buildLeftSections(
  header: TextItems,
  left: TextItems
): ResumeSectionToLines {
  const headerLines = groupTextItemsByPosition(header);
  const leftSections = groupLinesIntoSections(groupTextItemsByPosition(left));

  if (headerLines.length > 0) {
    leftSections[PROFILE_SECTION] = [
      ...headerLines,
      ...(leftSections[PROFILE_SECTION] ?? []),
    ];
  }

  return leftSections;
}

export function parseMultiColumnResume(textItems: TextItems): {
  resume: ParsedResume;
  structuredSectionNames: string[];
} {
  const { header, left, right } = partitionTextItemsForColumns(textItems);

  const leftSections = buildLeftSections(header, left);
  const rightSections = groupLinesIntoSections(groupTextItemsByPosition(right));

  const leftResume = extractResumeFromSections(leftSections);
  const rightResume = extractResumeFromSections(rightSections);
  const resume = mergeParsedResumes(leftResume, rightResume);

  const structuredSectionNames = [
    ...new Set([
      ...Object.keys(leftSections),
      ...Object.keys(rightSections),
    ]),
  ];

  return { resume, structuredSectionNames };
}
