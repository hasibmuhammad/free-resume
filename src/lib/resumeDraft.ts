import { RootState } from "@/redux/store";
import {
  RESUME_DRAFT_STORAGE_KEY,
  RESUME_DRAFT_VERSION,
  ResumeDraft,
} from "@/types/resumeDraft";

export function buildResumeDraft(state: RootState): ResumeDraft {
  return {
    version: RESUME_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    basicInfo: state.basicInfo,
    experience: { experiences: state.experience.experiences },
    education: { educations: state.education.educations },
    project: { projects: state.project.projects },
    skill: { skills: state.skill.skills },
    sections: {
      sections: state.sections.sections,
      visibility: state.sections.visibility,
    },
  };
}

export function saveResumeDraft(state: RootState): void {
  try {
    const draft = buildResumeDraft(state);
    localStorage.setItem(RESUME_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore quota / private mode errors
  }
}

export function loadResumeDraft(): ResumeDraft | null {
  try {
    const raw = localStorage.getItem(RESUME_DRAFT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ResumeDraft;
    if (parsed.version !== RESUME_DRAFT_VERSION) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function clearResumeDraft(): void {
  try {
    localStorage.removeItem(RESUME_DRAFT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function resumeDraftHasContent(draft: ResumeDraft): boolean {
  const { basicInfo } = draft;
  const hasBasic = Object.values(basicInfo).some(
    (v) => typeof v === "string" && v.trim() !== ""
  );

  return (
    hasBasic ||
    draft.skill.skills.length > 0 ||
    draft.experience.experiences.some(
      (e) => e.jobTitle.trim() || e.companyName.trim()
    ) ||
    draft.education.educations.some(
      (e) => e.degree.trim() || e.institute.trim()
    ) ||
    draft.project.projects.some((p) => p.projectTitle.trim())
  );
}

export function isResumeEmpty(state: RootState): boolean {
  const draft = buildResumeDraft(state);
  return !resumeDraftHasContent(draft);
}
