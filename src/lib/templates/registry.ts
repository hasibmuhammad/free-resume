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
  executive: {
    id: "executive",
    name: "Executive",
    description:
      "Refined serif typography with a charcoal-and-gold palette — built for senior roles and leadership resumes.",
    layoutMode: "single",
    sectionColumns: {
      experience: "main",
      education: "main",
      project: "main",
      skill: "main",
    },
    defaultTheme: {
      ...DEFAULT_RESUME_THEME_COLORS,
      primary: "#1F2937",
      secondary: "#B7791F",
      accent: "#1F2937",
      accentDark: "#111827",
    },
    defaultFontPreset: "playfair",
  },
  tech: {
    id: "tech",
    name: "Tech forward",
    description:
      "Two-column layout with skills and education in the sidebar — ideal for engineers and technical roles.",
    layoutMode: "split",
    sectionColumns: {
      experience: "main",
      education: "sidebar",
      project: "main",
      skill: "sidebar",
    },
    defaultTheme: {
      ...DEFAULT_RESUME_THEME_COLORS,
      primary: "#0F766E",
      secondary: "#0EA5E9",
      accent: "#0F766E",
      accentDark: "#115E59",
    },
    defaultFontPreset: "roboto",
  },
  elegant: {
    id: "elegant",
    name: "Elegant",
    description:
      "Warm serif headings with a deep burgundy accent — a polished look for creative and client-facing roles.",
    layoutMode: "split",
    sectionColumns: {
      experience: "main",
      education: "main",
      project: "main",
      skill: "sidebar",
    },
    defaultTheme: {
      ...DEFAULT_RESUME_THEME_COLORS,
      primary: "#7C2D3E",
      secondary: "#C08552",
      accent: "#7C2D3E",
      accentDark: "#621F2F",
    },
    defaultFontPreset: "lora",
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    description:
      "Near-monochrome single column with generous whitespace — lets your content do all the talking.",
    layoutMode: "single",
    sectionColumns: {
      experience: "main",
      education: "main",
      project: "main",
      skill: "main",
    },
    defaultTheme: {
      ...DEFAULT_RESUME_THEME_COLORS,
      primary: "#111827",
      secondary: "#6B7280",
      accent: "#111827",
      accentDark: "#111827",
    },
    defaultFontPreset: "montserrat",
  },
};

export const TEMPLATE_LIST = Object.values(RESUME_TEMPLATES);

export function isResumeTemplateId(value: string): value is ResumeTemplateId {
  return value in RESUME_TEMPLATES;
}

export function getTemplate(id: ResumeTemplateId): ResumeTemplateDefinition {
  return RESUME_TEMPLATES[id];
}
