"use client";

import { formatDateRange, formatEducationLine } from "@/lib/format";
import {
  hasEducationContent,
  hasExperienceContent,
  hasProjectContent,
  hasSkillsContent,
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
  buildFlowBlocks,
  paginateFlowColumns,
  shouldShowSectionTitle,
} from "@/lib/resumeFlowLayout";
import { shouldUseSplitColumnLayout } from "@/lib/resumeLayout";
import { RESUME_PREVIEW_PADDING as P, RESUME_LAYOUT } from "@/lib/resumeTheme";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
import { useAppSelector } from "@/redux/hooks";
import { EducationItem, ExperienceItem, ProjectItem, ResumeSection, SectionKey } from "@/types/resume";
import { DownloadPdfButton } from "../DownloadPdfButton/DownloadPdfButton";
import { PreviewHeader } from "./PreviewHeader";
import {
  PreviewEntry,
  PreviewSectionBlock,
  PreviewSkills,
  PreviewSummary,
} from "./PreviewSectionBlock";
import { PreviewZoomControls } from "./PreviewZoomControls";
import { usePreviewScale } from "./usePreviewScale";

function ExperienceBlock() {
  const experiences = useAppSelector((state) => state.experience.experiences);
  const filled = experiences.filter(isExperienceFilled);
  if (filled.length === 0) return null;

  return (
    <PreviewSectionBlock title={SECTION_REGISTRY.experience.previewTitle}>
      {filled.map((exp, index) => {
        const dateRange = formatDateRange(
          exp.startDate,
          exp.endDate,
          exp.currentlyWorking
        );
        const meta = [dateRange, exp.location.trim()].filter(Boolean).join("  ·  ");

        return (
          <PreviewEntry
            key={index}
            title={exp.jobTitle || exp.companyName}
            titleAccent={
              exp.jobTitle && exp.companyName ? exp.companyName : undefined
            }
            meta={meta || undefined}
            details={exp.accomplishments}
          />
        );
      })}
    </PreviewSectionBlock>
  );
}

function ProjectBlock() {
  const projects = useAppSelector((state) => state.project.projects);
  const filled = projects.filter(isProjectFilled);
  if (filled.length === 0) return null;

  return (
    <PreviewSectionBlock title={SECTION_REGISTRY.project.previewTitle}>
      {filled.map((project, index) => (
        <PreviewEntry
          key={index}
          title={project.projectTitle}
          titleDate={formatDateRange(
            project.startDate,
            project.endDate,
            project.currentlyWorking
          )}
          details={project.keyFeatures}
        />
      ))}
    </PreviewSectionBlock>
  );
}

function EducationBlock() {
  const educations = useAppSelector((state) => state.education.educations);
  const filled = educations.filter(isEducationFilled);
  if (filled.length === 0) return null;

  return (
    <PreviewSectionBlock title={SECTION_REGISTRY.education.previewTitle}>
      {filled.map((edu, index) => {
        const degreeLine = formatEducationLine(edu.degree, edu.gpa);

        return (
          <PreviewEntry
            key={index}
            title={degreeLine || edu.institute}
            titleAccent={
              degreeLine && edu.institute ? edu.institute : undefined
            }
            meta={formatDateRange(
              edu.startDate,
              edu.endDate,
              edu.currentlyTaking
            )}
          />
        );
      })}
    </PreviewSectionBlock>
  );
}

function SkillsBlock() {
  const skills = useAppSelector((state) => state.skill.skills);
  const visibleSkills = skills.filter((s) => s.trim() !== "");
  if (visibleSkills.length === 0) return null;

  return (
    <PreviewSectionBlock title={SECTION_REGISTRY.skill.previewTitle}>
      <PreviewSkills skills={visibleSkills} />
    </PreviewSectionBlock>
  );
}

const PREVIEW_BLOCKS: Record<SectionKey, React.ComponentType> = {
  experience: ExperienceBlock,
  project: ProjectBlock,
  education: EducationBlock,
  skill: SkillsBlock,
};

function PreviewSectionRenderer({ sectionKey }: { sectionKey: SectionKey }) {
  const visibility = useAppSelector(
    (state) => state.sections.visibility[sectionKey]
  );
  const experiences = useAppSelector((state) => state.experience.experiences);
  const projects = useAppSelector((state) => state.project.projects);
  const educations = useAppSelector((state) => state.education.educations);
  const skills = useAppSelector((state) => state.skill.skills);

  const hasContent = {
    experience: hasExperienceContent(experiences),
    project: hasProjectContent(projects),
    education: hasEducationContent(educations),
    skill: hasSkillsContent(skills),
  }[sectionKey];

  if (!visibility || !hasContent) return null;

  const Block = PREVIEW_BLOCKS[sectionKey];
  return <Block />;
}

const PAGE_WIDTH = RESUME_LAYOUT.pageWidth;
const PAGE_HEIGHT = RESUME_LAYOUT.pageHeight;

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
      const meta = [dateRange, exp.location.trim()].filter(Boolean).join("  ·  ");
      const entry = (
        <PreviewEntry
          title={exp.jobTitle || exp.companyName}
          titleAccent={
            exp.jobTitle && exp.companyName ? exp.companyName : undefined
          }
          meta={meta || undefined}
          details={exp.accomplishments}
        />
      );

      if (showTitle) {
        return (
          <PreviewSectionBlock title={SECTION_REGISTRY.experience.previewTitle}>
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
          titleDate={formatDateRange(
            project.startDate,
            project.endDate,
            project.currentlyWorking
          )}
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
          meta={formatDateRange(
            edu.startDate,
            edu.endDate,
            edu.currentlyTaking
          )}
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

function PreviewBody({
  summary,
  sections,
  useSplitColumn,
  sectionContentMap,
  visibility,
  experiences,
  projects,
  educations,
  skills,
}: {
  summary: string;
  sections: ResumeSection[];
  useSplitColumn: boolean;
  sectionContentMap: Record<SectionKey, boolean>;
  visibility: Record<SectionKey, boolean>;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  skills: string[];
}) {
  if (useSplitColumn) {
    const filledExperiences = experiences.filter(isExperienceFilled);
    const filledProjects = projects.filter(isProjectFilled);
    const filledEducations = educations.filter(isEducationFilled);
    const visibleSkills = skills.filter((skill) => skill.trim() !== "");

    const flowPages = paginateFlowColumns(
      buildFlowBlocks(sections, visibility, sectionContentMap, {
        summary,
        experiences: filledExperiences,
        projects: filledProjects,
        educations: filledEducations,
        skills: visibleSkills,
      })
    );

    return (
      <>
        {flowPages.map((page, pageIndex) => (
          <div key={pageIndex} className={pageIndex > 0 ? "mt-6" : undefined}>
            <PreviewFlowPage
              page={page}
              summary={summary}
              experiences={experiences}
              projects={projects}
              educations={educations}
              skills={skills}
            />
          </div>
        ))}
      </>
    );
  }

  const summaryBlock = summary ? <PreviewSummary text={summary} /> : null;

  return (
    <>
      {summaryBlock}
      <div className="space-y-1">
        {sections.map(({ key }) => (
          <PreviewSectionRenderer key={key} sectionKey={key} />
        ))}
      </div>
    </>
  );
}

const Preview = () => {
  const basicInfo = useAppSelector((state) => state.basicInfo);
  const sections = useAppSelector((state) => state.sections.sections);
  const visibility = useAppSelector((state) => state.sections.visibility);
  const experiences = useAppSelector((state) => state.experience.experiences);
  const projects = useAppSelector((state) => state.project.projects);
  const educations = useAppSelector((state) => state.education.educations);
  const skills = useAppSelector((state) => state.skill.skills);
  const summary = basicInfo.summary.trim();
  const {
    viewportRef,
    contentRef,
    scale,
    scaleReady,
    autoFit,
    paperHeight,
    zoomIn,
    zoomOut,
    resetFit,
    canZoomIn,
    canZoomOut,
  } = usePreviewScale(PAGE_WIDTH, PAGE_HEIGHT);

  const sectionContentMap = {
    experience: hasExperienceContent(experiences),
    project: hasProjectContent(projects),
    education: hasEducationContent(educations),
    skill: hasSkillsContent(skills),
  };

  const useSplitColumn = shouldUseSplitColumnLayout(
    sections,
    visibility,
    sectionContentMap
  );

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-700/60 dark:bg-slate-900 dark:shadow-dark-card"
      id="resume-preview"
    >
      <div className="panel-header flex items-center justify-between gap-3">
        <span className="section-label !normal-case !tracking-normal text-[11px]">
          Live preview
        </span>
        <div className="flex items-center gap-2.5">
          <PreviewZoomControls
            scale={scale}
            autoFit={autoFit}
            canZoomIn={canZoomIn}
            canZoomOut={canZoomOut}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onResetFit={resetFit}
          />
          <DownloadPdfButton />
        </div>
      </div>
      <div
        ref={viewportRef}
        className="scrollbar-thin min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-slate-100 dark:bg-slate-950"
      >
        <div className="flex min-h-full w-full min-w-0 justify-center px-4 py-4">
          <div
            className="mx-auto shrink-0 transition-opacity duration-150"
            style={{
              width: PAGE_WIDTH * scale,
              height: paperHeight * scale,
              position: "relative",
              opacity: scaleReady ? 1 : 0,
            }}
          >
            <div
              id="resume-export-root"
              ref={contentRef}
              className="preview-paper overflow-x-hidden shadow-elevated"
              style={{
                width: PAGE_WIDTH,
                minHeight: PAGE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
                boxSizing: "border-box",
                paddingLeft: P.x,
                paddingRight: P.x,
                paddingTop: P.top,
                paddingBottom: P.bottom,
              }}
            >
              <PreviewHeader basicInfo={basicInfo} />

              <PreviewBody
                summary={summary}
                sections={sections}
                useSplitColumn={useSplitColumn}
                sectionContentMap={sectionContentMap}
                visibility={visibility}
                experiences={experiences}
                projects={projects}
                educations={educations}
                skills={skills}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
