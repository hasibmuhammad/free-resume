import { ResumeSection, SectionKey } from "@/types/resume";

export type SectionContentMap = Record<SectionKey, boolean>;

export function sectionIsVisible(
  key: SectionKey,
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap
): boolean {
  return visibility[key] && hasContent[key];
}

export function getVisibleSections(
  sections: ResumeSection[],
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap
): ResumeSection[] {
  return sections.filter((section) =>
    sectionIsVisible(section.key, visibility, hasContent)
  );
}

/** Use a single column for sparse resumes; split when main + sidebar both have enough content. */
export function shouldUseSplitColumnLayout(
  sections: ResumeSection[],
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap
): boolean {
  const visible = getVisibleSections(sections, visibility, hasContent);
  const hasMain = visible.some((section) => section.column === "main");
  const hasSidebar = visible.some((section) => section.column === "sidebar");

  if (!hasMain || !hasSidebar) return false;

  const mainCount = visible.filter((section) => section.column === "main").length;

  return mainCount >= 2 || visible.length >= 3;
}
