"use client";

import { formatExperienceTenureLabel } from "@/lib/experienceTenure";
import { formatDateRange, formatEducationLine } from "@/lib/format";
import {
  isEducationFilled,
  isExperienceFilled,
  isProjectFilled,
} from "@/lib/resumeContent";
import {
  FLOW_COLUMN_GAP,
  FLOW_MAIN_FLEX,
  FLOW_SIDEBAR_FLEX,
  FlowBlock,
  FlowColumnPage,
  RESUME_CONTINUATION_PAGE_BODY_HEIGHT,
  RESUME_FIRST_PAGE_BODY_HEIGHT,
  buildFlowBlocks,
  paginateFlowColumns,
  paginateFlowSingleColumn,
  shouldShowSectionTitle,
} from "@/lib/resumeFlowLayout";
import { RESUME_PREVIEW_PADDING as P, RESUME_LAYOUT } from "@/lib/resumeTheme";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
import {
  BasicInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  ResumeSection,
  SectionKey,
} from "@/types/resume";
import { PreviewHeader } from "./PreviewHeader";
import {
  PreviewEntry,
  PreviewSectionBlock,
  PreviewSkills,
  PreviewSummary,
} from "./PreviewSectionBlock";

export const RESUME_PAGE_WIDTH = RESUME_LAYOUT.pageWidth;
export const RESUME_PAGE_HEIGHT = RESUME_LAYOUT.pageHeight;
const PREVIEW_PAGE_GAP = 24;

export type ResumePreviewContentProps = {
  summary: string;
  sections: ResumeSection[];
  useSplitColumn: boolean;
  sectionContentMap: Record<SectionKey, boolean>;
  visibility: Record<SectionKey, boolean>;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
  basicInfo: BasicInfo;
  maxPages?: number;
  pageClassName?: string;
};

function PreviewPageSheet({
  pageIndex,
  header,
  children,
  pageClassName,
}: {
  pageIndex: number;
  header?: React.ReactNode;
  children: React.ReactNode;
  pageClassName?: string;
}) {
  const bodyMaxHeight =
    pageIndex === 0
      ? RESUME_FIRST_PAGE_BODY_HEIGHT
      : RESUME_CONTINUATION_PAGE_BODY_HEIGHT;

  return (
    <div
      className={`preview-paper box-border overflow-hidden shadow-elevated ${pageClassName ?? ""}`}
      style={{
        width: RESUME_PAGE_WIDTH,
        height: RESUME_PAGE_HEIGHT,
        boxSizing: "border-box",
        paddingLeft: P.x,
        paddingRight: P.x,
        paddingTop: P.top,
        paddingBottom: P.bottom,
        marginTop: pageIndex > 0 ? PREVIEW_PAGE_GAP : 0,
      }}
    >
      {header}
      <div className="overflow-hidden" style={{ maxHeight: bodyMaxHeight }}>
        {children}
      </div>
    </div>
  );
}

function PreviewFlowBlock({
  block,
  columnBlocks,
  summary,
  experiences,
  projects,
  educations,
  skills,
}: {
  block: FlowBlock;
  columnBlocks: FlowBlock[];
  summary: string;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}) {
  const filledExperiences = experiences.filter(isExperienceFilled);
  const filledProjects = projects.filter(isProjectFilled);
  const filledEducations = educations.filter(isEducationFilled);
  const visibleSkills = skills.filter((skill) => skill.trim() !== "");
  const showTitle = shouldShowSectionTitle(block, columnBlocks);

  switch (block.sectionKey) {
    case "summary":
      return showTitle ? <PreviewSummary text={summary} /> : null;

    case "experience": {
      const exp = filledExperiences[block.entryIndex ?? 0];
      if (!exp) return null;
      const dateRange = formatDateRange(
        exp.startDate,
        exp.endDate,
        exp.currentlyWorking
      );
      const entry = (
        <PreviewEntry
          title={exp.jobTitle || exp.companyName}
          titleAccent={
            exp.jobTitle && exp.companyName ? exp.companyName : undefined
          }
          titleDate={dateRange || undefined}
          meta={exp.location.trim() || undefined}
          details={exp.accomplishments}
        />
      );

      if (showTitle) {
        const experienceTenure = formatExperienceTenureLabel(filledExperiences);
        return (
          <PreviewSectionBlock
            title={SECTION_REGISTRY.experience.previewTitle}
            titleSuffix={experienceTenure || undefined}
          >
            {entry}
          </PreviewSectionBlock>
        );
      }

      return entry;
    }

    case "project": {
      const project = filledProjects[block.entryIndex ?? 0];
      if (!project) return null;
      const entry = (
        <PreviewEntry
          title={project.projectTitle}
          titleDate={
            formatDateRange(
              project.startDate,
              project.endDate,
              project.currentlyWorking
            ) || undefined
          }
          details={project.keyFeatures}
        />
      );

      if (showTitle) {
        return (
          <PreviewSectionBlock title={SECTION_REGISTRY.project.previewTitle}>
            {entry}
          </PreviewSectionBlock>
        );
      }

      return entry;
    }

    case "education": {
      const edu = filledEducations[block.entryIndex ?? 0];
      if (!edu) return null;
      const degreeLine = formatEducationLine(edu.degree, edu.gpa);
      const entry = (
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
          details={edu.achievements}
        />
      );

      if (showTitle) {
        return (
          <PreviewSectionBlock title={SECTION_REGISTRY.education.previewTitle}>
            {entry}
          </PreviewSectionBlock>
        );
      }

      return entry;
    }

    case "skill":
      return showTitle ? (
        <PreviewSectionBlock title={SECTION_REGISTRY.skill.previewTitle}>
          <PreviewSkills skills={visibleSkills} />
        </PreviewSectionBlock>
      ) : null;

    default:
      return null;
  }
}

function PreviewFlowColumn({
  blocks,
  summary,
  experiences,
  projects,
  educations,
  skills,
}: {
  blocks: FlowBlock[];
  summary: string;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}) {
  return (
    <div className="space-y-1">
      {blocks.map((block) => (
        <PreviewFlowBlock
          key={block.key}
          block={block}
          columnBlocks={blocks}
          summary={summary}
          experiences={experiences}
          projects={projects}
          educations={educations}
          skills={skills}
        />
      ))}
    </div>
  );
}

function PreviewFlowPage({
  page,
  summary,
  experiences,
  projects,
  educations,
  skills,
}: {
  page: FlowColumnPage;
  summary: string;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}) {
  return (
    <div className="flex min-w-0 flex-nowrap items-start">
      <div
        className="min-w-0"
        style={{
          flex: FLOW_MAIN_FLEX,
          paddingRight: FLOW_COLUMN_GAP / 2,
        }}
      >
        <PreviewFlowColumn
          blocks={page.left}
          summary={summary}
          experiences={experiences}
          projects={projects}
          educations={educations}
          skills={skills}
        />
      </div>
      <div
        className="min-w-0"
        style={{
          flex: FLOW_SIDEBAR_FLEX,
          paddingLeft: FLOW_COLUMN_GAP / 2,
        }}
      >
        <PreviewFlowColumn
          blocks={page.right}
          summary={summary}
          experiences={experiences}
          projects={projects}
          educations={educations}
          skills={skills}
        />
      </div>
    </div>
  );
}

function PreviewSingleColumnPage({
  blocks,
  summary,
  experiences,
  projects,
  educations,
  skills,
}: {
  blocks: FlowBlock[];
  summary: string;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}) {
  return (
    <div className="space-y-1">
      {blocks.map((block) => (
        <PreviewFlowBlock
          key={block.key}
          block={block}
          columnBlocks={blocks}
          summary={summary}
          experiences={experiences}
          projects={projects}
          educations={educations}
          skills={skills}
        />
      ))}
    </div>
  );
}

export function ResumePreviewContent({
  summary,
  sections,
  useSplitColumn,
  sectionContentMap,
  visibility,
  experiences,
  projects,
  educations,
  skills,
  basicInfo,
  maxPages,
  pageClassName,
}: ResumePreviewContentProps) {
  if (useSplitColumn) {
    const filledExperiences = experiences.filter(isExperienceFilled);
    const filledProjects = projects.filter(isProjectFilled);
    const filledEducations = educations.filter(isEducationFilled);
    const visibleSkills = skills.filter((skill) => skill.trim() !== "");

    const flowPages = paginateFlowColumns(
      buildFlowBlocks(
        sections,
        visibility,
        sectionContentMap,
        {
          summary,
          experiences: filledExperiences,
          projects: filledProjects,
          educations: filledEducations,
          skills: visibleSkills,
        },
        "split"
      )
    );

    const visiblePages = maxPages ? flowPages.slice(0, maxPages) : flowPages;

    return (
      <>
        {visiblePages.map((page, pageIndex) => (
          <PreviewPageSheet
            key={pageIndex}
            pageIndex={pageIndex}
            pageClassName={pageClassName}
            header={
              pageIndex === 0 ? (
                <PreviewHeader basicInfo={basicInfo} />
              ) : undefined
            }
          >
            <PreviewFlowPage
              page={page}
              summary={summary}
              experiences={experiences}
              projects={projects}
              educations={educations}
              skills={skills}
            />
          </PreviewPageSheet>
        ))}
      </>
    );
  }

  const filledExperiences = experiences.filter(isExperienceFilled);
  const filledProjects = projects.filter(isProjectFilled);
  const filledEducations = educations.filter(isEducationFilled);
  const visibleSkills = skills.filter((skill) => skill.trim() !== "");

  const singleColumnPages = paginateFlowSingleColumn(
    buildFlowBlocks(
      sections,
      visibility,
      sectionContentMap,
      {
        summary,
        experiences: filledExperiences,
        projects: filledProjects,
        educations: filledEducations,
        skills: visibleSkills,
      },
      "single"
    )
  );

  const visiblePages = maxPages
    ? singleColumnPages.slice(0, maxPages)
    : singleColumnPages;

  return (
    <>
      {visiblePages.map((pageBlocks, pageIndex) => (
        <PreviewPageSheet
          key={pageIndex}
          pageIndex={pageIndex}
          pageClassName={pageClassName}
          header={
            pageIndex === 0 ? (
              <PreviewHeader basicInfo={basicInfo} />
            ) : undefined
          }
        >
          <PreviewSingleColumnPage
            blocks={pageBlocks}
            summary={summary}
            experiences={experiences}
            projects={projects}
            educations={educations}
            skills={skills}
          />
        </PreviewPageSheet>
      ))}
    </>
  );
}
