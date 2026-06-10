import { RootState } from "@/redux/store";
import {
  hasEducationContent,
  hasExperienceContent,
  hasProjectContent,
  hasSkillsContent,
  isEducationFilled,
  isExperienceFilled,
  isProjectFilled,
} from "@/lib/resumeContent";
import { resolveResumeTheme } from "@/lib/templates/resolveTheme";
import { SectionKey } from "@/types/resume";
import { SectionContentMap } from "@/lib/resumeLayout";
import { ResumePdfData } from "./types";

export function buildResumePdfData(state: RootState): ResumePdfData {
  const experiences = state.experience.experiences.filter(isExperienceFilled);
  const projects = state.project.projects.filter(isProjectFilled);
  const educations = state.education.educations.filter(isEducationFilled);
  const skills = state.skill.skills.filter((skill) => skill.trim() !== "");
  const templateId = state.template.templateId;
  const theme = resolveResumeTheme(
    templateId,
    state.template.themeCustomization
  );

  return {
    basicInfo: state.basicInfo,
    templateId,
    theme,
    sections: state.sections.sections,
    visibility: state.sections.visibility,
    experiences,
    projects,
    educations,
    skills,
  };
}

export function getPdfSectionContentMap(data: ResumePdfData): SectionContentMap {
  return {
    experience: hasExperienceContent(data.experiences),
    project: hasProjectContent(data.projects),
    education: hasEducationContent(data.educations),
    skill: hasSkillsContent(data.skills),
  };
}

export function sectionHasPdfContent(
  key: SectionKey,
  data: ResumePdfData
): boolean {
  if (!data.visibility[key]) return false;

  return {
    experience: hasExperienceContent(data.experiences),
    project: hasProjectContent(data.projects),
    education: hasEducationContent(data.educations),
    skill: hasSkillsContent(data.skills),
  }[key];
}
