import { ResumeSection, SectionKey } from "@/types/resume";

export const SECTION_REGISTRY: Record<SectionKey, Omit<ResumeSection, "key">> = {
  experience: {
    title: "Experience",
    previewTitle: "Experience",
    pdfTitle: "Experience",
    column: "main",
  },
  project: {
    title: "Projects",
    previewTitle: "Projects",
    pdfTitle: "Projects",
    column: "main",
  },
  education: {
    title: "Education",
    previewTitle: "Education",
    pdfTitle: "Education",
    column: "main",
  },
  skill: {
    title: "Skills",
    previewTitle: "Skills",
    pdfTitle: "Skills",
    column: "sidebar",
  },
};

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "experience",
  "education",
  "project",
  "skill",
];
