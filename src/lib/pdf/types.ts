import {
  BasicInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SectionKey,
  ResumeSection,
} from "@/types/resume";
import { ResolvedResumeTheme } from "@/lib/templates/resolveTheme";
import { ResumeTemplateId } from "@/lib/templates/types";

export interface ResumePdfData {
  basicInfo: BasicInfo;
  templateId: ResumeTemplateId;
  theme: ResolvedResumeTheme;
  sections: ResumeSection[];
  visibility: Record<SectionKey, boolean>;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}
