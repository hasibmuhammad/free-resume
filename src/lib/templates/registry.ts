import { DEFAULT_RESUME_THEME_COLORS } from "@/lib/resumeTheme";
import {
  ResumeTemplateDefinition,
  ResumeTemplateId,
} from "@/lib/templates/types";

export const DEFAULT_TEMPLATE_ID: ResumeTemplateId = "modern-split";

export const RESUME_TEMPLATES: Record<
  ResumeTemplateId,
  ResumeTemplateDefinition
> = {
  "modern-split": {
    id: "modern-split",
    name: "Modern split",
    description:
      "Two-column layout with experience and projects on the left and skills in a sidebar — great for dense resumes.",
    layoutMode: "split",
    sectionColumns: {
      experience: "main",
      education: "main",
      project: "main",
      skill: "sidebar",
    },
    defaultTheme: DEFAULT_RESUME_THEME_COLORS,
    defaultFontPreset: "inter",
  },
  "classic-single": {
    id: "classic-single",
    name: "Classic single column",
    description:
      "Traditional one-column flow — every section stacks top to bottom for maximum ATS simplicity.",
    layoutMode: "single",
    sectionColumns: {
      experience: "main",
      education: "main",
      project: "main",
      skill: "main",
    },
    defaultTheme: {
      ...DEFAULT_RESUME_THEME_COLORS,
      primary: "#1a365d",
      secondary: "#c05621",
    },
    defaultFontPreset: "classic",
  },
};

export const TEMPLATE_LIST = Object.values(RESUME_TEMPLATES);

export function isResumeTemplateId(value: string): value is ResumeTemplateId {
  return value === "modern-split" || value === "classic-single";
}

export function getTemplate(id: ResumeTemplateId): ResumeTemplateDefinition {
  return RESUME_TEMPLATES[id];
}
