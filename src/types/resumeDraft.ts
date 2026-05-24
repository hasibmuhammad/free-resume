import { BasicInfo, SectionKey, ResumeSection } from "./resume";
import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "./resume";

export const RESUME_DRAFT_VERSION = 1;
export const RESUME_DRAFT_STORAGE_KEY = "freeresume-draft";

export interface ResumeDraft {
  version: typeof RESUME_DRAFT_VERSION;
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
