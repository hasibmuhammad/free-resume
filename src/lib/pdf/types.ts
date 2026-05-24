import {
  BasicInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SectionKey,
  ResumeSection,
} from "@/types/resume";

export interface ResumePdfData {
  basicInfo: BasicInfo;
  sections: ResumeSection[];
  visibility: Record<SectionKey, boolean>;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}
