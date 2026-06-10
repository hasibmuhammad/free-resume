import { BasicInfo, SectionKey, ResumeSection } from "./resume";
import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "./resume";
import { isResumeFontPreset } from "@/lib/templates/fontPresets";
import { ResumeThemeCustomization, ResumeTemplateId } from "@/lib/templates/types";
import { DEFAULT_TEMPLATE_ID } from "@/lib/templates/registry";

export const RESUME_DRAFT_VERSION = 2;
export const RESUME_DRAFT_STORAGE_KEY = "freeresume-draft";

export interface ResumeDraftV1 {
  version: 1;
  savedAt: string;
  basicInfo: BasicInfo;
  experience: { experiences: ExperienceItem[] };
  education: { educations: EducationItem[] };
  project: { projects: ProjectItem[] };
  skill: { skills: string[] };
  sections: {
    sections: ResumeSection[];
    visibility: Record<SectionKey, boolean>;
  };
}

export interface ResumeDraft {
  version: typeof RESUME_DRAFT_VERSION;
  savedAt: string;
  templateId: ResumeTemplateId;
  themeCustomization: ResumeThemeCustomization;
  basicInfo: BasicInfo;
  experience: { experiences: ExperienceItem[] };
  education: { educations: EducationItem[] };
  project: { projects: ProjectItem[] };
  skill: { skills: string[] };
  sections: {
    sections: ResumeSection[];
    visibility: Record<SectionKey, boolean>;
  };
}

export function migrateResumeDraft(parsed: unknown): ResumeDraft | null {
  if (!parsed || typeof parsed !== "object") return null;

  const draft = parsed as Partial<ResumeDraft> & Partial<ResumeDraftV1>;

  if (draft.version === 1) {
    return {
      ...(draft as ResumeDraftV1),
      version: RESUME_DRAFT_VERSION,
      templateId: DEFAULT_TEMPLATE_ID,
      themeCustomization: {},
    };
  }

  if (draft.version !== RESUME_DRAFT_VERSION) return null;

  const themeCustomization = { ...(draft.themeCustomization ?? {}) };
  if (
    themeCustomization.fontPreset &&
    !isResumeFontPreset(themeCustomization.fontPreset)
  ) {
    delete themeCustomization.fontPreset;
  }

  return {
    version: RESUME_DRAFT_VERSION,
    savedAt: draft.savedAt ?? new Date().toISOString(),
    templateId: draft.templateId ?? DEFAULT_TEMPLATE_ID,
    themeCustomization,
    basicInfo: draft.basicInfo!,
    experience: draft.experience!,
    education: draft.education!,
    project: draft.project!,
    skill: draft.skill!,
    sections: draft.sections!,
  };
}
