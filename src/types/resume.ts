import { DateValueType } from "react-tailwindcss-datepicker";

export type SectionKey = "experience" | "project" | "education" | "skill";

export type SectionColumn = "main" | "sidebar";

export interface ResumeSection {
  key: SectionKey;
  title: string;
  column: SectionColumn;
  previewTitle: string;
  pdfTitle: string;
}

export interface BasicInfo {
  fullName: string;
  designation: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  github: string;
  linkedin: string;
}

export interface ExperienceItem {
  companyName: string;
  jobTitle: string;
  location: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  accomplishments: string;
}

export interface EducationItem {
  degree: string;
  gpa: string;
  institute: string;
  currentlyTaking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  /** Honors, awards, relevant coursework — one bullet per line. */
  achievements: string;
}

export interface ProjectItem {
  projectTitle: string;
  currentlyWorking: boolean;
  startDate: DateValueType;
  endDate: DateValueType;
  keyFeatures: string;
}

export const EMPTY_DATE: DateValueType = {
  startDate: null,
  endDate: null,
};
