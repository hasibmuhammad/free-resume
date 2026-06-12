import { createSampleResumeDraft } from "@/lib/sampleResume";
import { ResumeTemplateId } from "@/lib/templates/types";
import { ResumeDraft } from "@/types/resumeDraft";

/** Trimmed sample resume for marketing previews — enough content to look real without overflowing cards. */
export function createMarketingSampleDraft(
  templateId: ResumeTemplateId = "modern-split"
): ResumeDraft {
  const sample = createSampleResumeDraft();

  return {
    ...sample,
    templateId,
    experience: {
      experiences: sample.experience.experiences.slice(0, 2),
    },
    project: {
      projects: sample.project.projects.slice(0, 1),
    },
  };
}
