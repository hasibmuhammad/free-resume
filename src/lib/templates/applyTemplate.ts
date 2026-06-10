import { getTemplate } from "@/lib/templates/registry";
import { ResumeSection } from "@/types/resume";
import { ResumeTemplateId } from "@/lib/templates/types";

export function applyTemplateSectionColumns(
  templateId: ResumeTemplateId,
  sections: ResumeSection[]
): ResumeSection[] {
  const template = getTemplate(templateId);

  return sections.map((section) => ({
    ...section,
    column: template.sectionColumns[section.key],
  }));
}

export function getLayoutModeForTemplate(
  templateId: ResumeTemplateId
): "split" | "single" {
  return getTemplate(templateId).layoutMode;
}

export function shouldUseSplitColumnForTemplate(
  templateId: ResumeTemplateId
): boolean {
  return getLayoutModeForTemplate(templateId) === "split";
}
