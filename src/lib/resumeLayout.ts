import { ResumeSection, SectionKey } from "@/types/resume";
import { ResumeTemplateId } from "@/lib/templates/types";
import { getLayoutModeForTemplate } from "@/lib/templates/applyTemplate";

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
 * Split vs single column — driven by the selected template, with a legacy
 * heuristic fallback when no template id is supplied.
 */
export function shouldUseSplitColumnLayout(
  sections: ResumeSection[],
  visibility: Record<SectionKey, boolean>,
  hasContent: SectionContentMap,
  templateId?: ResumeTemplateId
): boolean {
  if (templateId) {
    return getLayoutModeForTemplate(templateId) === "split";
  }

  const visible = getVisibleSections(sections, visibility, hasContent);
  if (visible.length <= 2) return false;

  const hasMain = visible.some((section) => section.column === "main");
  const hasSidebar = visible.some((section) => section.column === "sidebar");

  if (hasMain && hasSidebar) return true;

  return visible.length >= 3;
}
