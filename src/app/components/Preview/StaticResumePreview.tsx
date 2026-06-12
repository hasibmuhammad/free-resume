"use client";

import { createMarketingSampleDraft } from "@/lib/marketingSampleResume";
import {
  hasEducationContent,
  hasExperienceContent,
  hasProjectContent,
  hasSkillsContent,
} from "@/lib/resumeContent";
import { shouldUseSplitColumnLayout } from "@/lib/resumeLayout";
import { resolveResumeTheme } from "@/lib/templates/resolveTheme";
import { ResumeTemplateId } from "@/lib/templates/types";
import {
  RESUME_PAGE_HEIGHT,
  RESUME_PAGE_WIDTH,
  ResumePreviewContent,
} from "./ResumePreviewContent";
import { StaticPreviewThemeProvider } from "./PreviewThemeContext";

type StaticResumePreviewProps = {
  templateId: ResumeTemplateId;
  scale?: number;
  maxPages?: number;
  className?: string;
  pageClassName?: string;
};

export function StaticResumePreview({
  templateId,
  scale = 0.36,
  maxPages = 1,
  className,
  pageClassName,
}: StaticResumePreviewProps) {
  const draft = createMarketingSampleDraft(templateId);
  const theme = resolveResumeTheme(templateId, draft.themeCustomization);
  const { basicInfo, sections, experience, project, education, skill } = draft;
  const summary = basicInfo.summary.trim();
  const experiences = experience.experiences;
  const projects = project.projects;
  const educations = education.educations;
  const skills = skill.skills;

  const sectionContentMap = {
    experience: hasExperienceContent(experiences),
    project: hasProjectContent(projects),
    education: hasEducationContent(educations),
    skill: hasSkillsContent(skills),
  };

  const useSplitColumn = shouldUseSplitColumnLayout(
    sections.sections,
    sections.visibility,
    sectionContentMap,
    templateId
  );

  const scaledWidth = RESUME_PAGE_WIDTH * scale;
  const scaledHeight = RESUME_PAGE_HEIGHT * scale * maxPages;

  return (
    <div
      className={className}
      style={{
        width: scaledWidth,
        height: scaledHeight,
        position: "relative",
      }}
    >
      <StaticPreviewThemeProvider theme={theme}>
        <div
          style={{
            width: RESUME_PAGE_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            fontFamily: theme.previewFontFamily,
          }}
        >
          <ResumePreviewContent
            summary={summary}
            sections={sections.sections}
            useSplitColumn={useSplitColumn}
            sectionContentMap={sectionContentMap}
            visibility={sections.visibility}
            experiences={experiences}
            projects={projects}
            educations={educations}
            skills={skills}
            basicInfo={basicInfo}
            maxPages={maxPages}
            pageClassName={pageClassName}
          />
        </div>
      </StaticPreviewThemeProvider>
    </div>
  );
}
