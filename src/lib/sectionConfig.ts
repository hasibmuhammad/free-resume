import { ResumeSection, SectionKey } from "@/types/resume";

export const SECTION_REGISTRY: Record<SectionKey, Omit<ResumeSection, "key">> = {
  experience: {
    title: "Experience",
    previewTitle: "Experience",
    column: "main",
  },
  project: {
    title: "Projects",
    previewTitle: "Projects",
    column: "main",
  },
  education: {
    title: "Education",
    previewTitle: "Education",
    column: "sidebar",
  },
  skill: {
    title: "Skills",
    previewTitle: "Skills",
    column: "sidebar",
  },
};

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "experience",
  "project",
  "education",
  "skill",
];
