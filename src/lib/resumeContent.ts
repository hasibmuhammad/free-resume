import {
  EducationItem,
  ExperienceItem,
  ProjectItem,
} from "@/types/resume";

export function isExperienceFilled(exp: ExperienceItem): boolean {
  return Boolean(exp.jobTitle.trim() || exp.companyName.trim());
}

export function isProjectFilled(project: ProjectItem): boolean {
  return Boolean(project.projectTitle.trim());
}

export function isEducationFilled(edu: EducationItem): boolean {
  return Boolean(edu.degree.trim() || edu.institute.trim());
}

export function hasExperienceContent(experiences: ExperienceItem[]): boolean {
  return experiences.some(isExperienceFilled);
}

export function hasProjectContent(projects: ProjectItem[]): boolean {
  return projects.some(isProjectFilled);
}

export function hasEducationContent(educations: EducationItem[]): boolean {
  return educations.some(isEducationFilled);
}

export function hasSkillsContent(skills: string[]): boolean {
  return skills.some((skill) => skill.trim() !== "");
}
