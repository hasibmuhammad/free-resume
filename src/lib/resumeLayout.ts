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

/**
 * Use a single column only for sparse resumes (1–2 sections).
 * Split when sidebar + main coexist, or when enough sections benefit from two-column flow.
 */
export function shouldUseSplitColumnLayout(
  sections: ResumeSection[],
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap
): boolean {
  const visible = getVisibleSections(sections, visibility, hasContent);
  if (visible.length <= 2) return false;

  const hasMain = visible.some((section) => section.column === "main");
  const hasSidebar = visible.some((section) => section.column === "sidebar");

  if (hasMain && hasSidebar) return true;

  // All-main layouts (e.g. sample) still use two-column flow when content is dense.
  return visible.length >= 3;
}
