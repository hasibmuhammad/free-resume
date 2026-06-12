"use client";

import { formatDateRange, formatEducationLine } from "@/lib/format";
import { createMarketingSampleDraft } from "@/lib/marketingSampleResume";
import { resolveResumeTheme } from "@/lib/templates/resolveTheme";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
import { StaticPreviewThemeProvider } from "./PreviewThemeContext";
import {
  PreviewEntry,
  PreviewSectionBlock,
  PreviewSkills,
} from "./PreviewSectionBlock";

type SectionPreviewSnippetProps = {
  section: "experience" | "education" | "project" | "skill";
};

export function SectionPreviewSnippet({ section }: SectionPreviewSnippetProps) {
  const draft = createMarketingSampleDraft();
  const theme = resolveResumeTheme(draft.templateId, draft.themeCustomization);

  let content: React.ReactNode;

  switch (section) {
    case "experience": {
      const exp = draft.experience.experiences[0];
      content = (
        <PreviewSectionBlock title={SECTION_REGISTRY.experience.previewTitle}>
          <PreviewEntry
            title={exp.jobTitle || exp.companyName}
            titleAccent={
              exp.jobTitle && exp.companyName ? exp.companyName : undefined
            }
            titleDate={
              formatDateRange(
                exp.startDate,
                exp.endDate,
                exp.currentlyWorking
              ) || undefined
            }
            meta={exp.location.trim() || undefined}
            details={exp.accomplishments.split("\n").slice(0, 2).join("\n")}
          />
        </PreviewSectionBlock>
      );
      break;
    }
    case "education": {
      const edu = draft.education.educations[0];
      const degreeLine = formatEducationLine(edu.degree, edu.gpa);
      content = (
        <PreviewSectionBlock title={SECTION_REGISTRY.education.previewTitle}>
          <PreviewEntry
            title={degreeLine || edu.institute}
            titleAccent={
              degreeLine && edu.institute ? edu.institute : undefined
            }
            titleDate={
              formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.currentlyTaking
              ) || undefined
            }
          />
        </PreviewSectionBlock>
      );
      break;
    }
    case "project": {
      const project = draft.project.projects[0];
      content = (
        <PreviewSectionBlock title={SECTION_REGISTRY.project.previewTitle}>
          <PreviewEntry
            title={project.projectTitle}
            titleDate={
              formatDateRange(
                project.startDate,
                project.endDate,
                project.currentlyWorking
              ) || undefined
            }
            details={project.keyFeatures.split("\n").slice(0, 2).join("\n")}
          />
        </PreviewSectionBlock>
      );
      break;
    }
    case "skill":
      content = (
        <PreviewSectionBlock title={SECTION_REGISTRY.skill.previewTitle}>
          <PreviewSkills skills={draft.skill.skills.slice(0, 4)} />
        </PreviewSectionBlock>
      );
      break;
  }

  return (
    <StaticPreviewThemeProvider theme={theme}>
      <div
        className="preview-paper rounded-sm p-4 text-left shadow-sm ring-1 ring-slate-200/60"
        style={{ fontFamily: theme.previewFontFamily }}
      >
        {content}
      </div>
    </StaticPreviewThemeProvider>
  );
}
