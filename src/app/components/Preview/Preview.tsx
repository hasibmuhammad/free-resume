"use client";

import { useAppSelector } from "@/redux/hooks";
import { RESUME_LAYOUT, RESUME_PREVIEW_PADDING as P, RESUME_THEME } from "@/lib/resumeTheme";
import { SECTION_REGISTRY } from "@/lib/sectionConfig";
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
import { SectionKey } from "@/types/resume";
import { DownloadPdfButton } from "../DownloadPdfButton/DownloadPdfButton";
import { PreviewHeader } from "./PreviewHeader";
import {
  PreviewEntry,
  PreviewSectionBlock,
  PreviewSkills,
  PreviewSummary,
} from "./PreviewSectionBlock";

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

const Preview = () => {
  const basicInfo = useAppSelector((state) => state.basicInfo);
  const sections = useAppSelector((state) => state.sections.sections);
  const summary = basicInfo.summary.trim();

  const mainSections = sections.filter((s) => s.column === "main");
  const sidebarSections = sections.filter((s) => s.column === "sidebar");

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-700/60 dark:bg-slate-900 dark:shadow-dark-card"
      id="resume-preview"
    >
      <div className="panel-header flex items-center justify-between gap-3">
        <span className="section-label !normal-case !tracking-normal text-[11px]">
          Live preview
        </span>
        <DownloadPdfButton />
      </div>
      <div
        id="resume-export-root"
        className="preview-paper scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        <div
          style={{
            paddingLeft: P.x,
            paddingRight: P.x,
            paddingTop: P.top,
            paddingBottom: P.bottom,
          }}
        >
          <PreviewHeader basicInfo={basicInfo} />

          <div
            className="grid grid-cols-12 items-start"
            style={{ gap: RESUME_LAYOUT.columnGap }}
          >
            <div className="col-span-12 min-w-0 md:col-span-8">
              {summary ? <PreviewSummary text={summary} /> : null}
              <div className="space-y-1">
                {mainSections.map(({ key }) => (
                  <PreviewSectionRenderer key={key} sectionKey={key} />
                ))}
              </div>
            </div>

            <div className="col-span-12 min-w-0 md:col-span-4">
              <div className="space-y-1">
                {sidebarSections.map(({ key }) => (
                  <PreviewSectionRenderer key={key} sectionKey={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
