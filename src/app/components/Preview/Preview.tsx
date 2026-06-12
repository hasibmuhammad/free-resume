"use client";

import {
  hasEducationContent,
  hasExperienceContent,
  hasProjectContent,
  hasSkillsContent,
} from "@/lib/resumeContent";
import { shouldUseSplitColumnLayout } from "@/lib/resumeLayout";
import { RESUME_LAYOUT } from "@/lib/resumeTheme";
import { useAppSelector } from "@/redux/hooks";
import { PreviewThemeProvider } from "./PreviewThemeContext";
import { ResumePreviewContent } from "./ResumePreviewContent";
import { PreviewZoomControls } from "./PreviewZoomControls";
import { usePreviewScale } from "./usePreviewScale";
import { useResumeTheme } from "@/hooks/useResumeTheme";

const PAGE_WIDTH = RESUME_LAYOUT.pageWidth;
const PAGE_HEIGHT = RESUME_LAYOUT.pageHeight;

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
  const { previewFontFamily } = useResumeTheme();

  const sectionContentMap = {
    experience: hasExperienceContent(experiences),
    project: hasProjectContent(projects),
    education: hasEducationContent(educations),
    skill: hasSkillsContent(skills),
  };

  const templateId = useAppSelector((state) => state.template.templateId);
  const useSplitColumn = shouldUseSplitColumnLayout(
    sections,
    visibility,
    sectionContentMap,
    templateId
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
            <PreviewThemeProvider>
              <div
                id="resume-export-root"
                ref={contentRef}
                className="overflow-x-hidden"
                style={{
                  width: PAGE_WIDTH,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  boxSizing: "border-box",
                  fontFamily: previewFontFamily,
                }}
              >
                <ResumePreviewContent
                  summary={summary}
                  sections={sections}
                  useSplitColumn={useSplitColumn}
                  sectionContentMap={sectionContentMap}
                  visibility={visibility}
                  experiences={experiences}
                  projects={projects}
                  educations={educations}
                  skills={skills}
                  basicInfo={basicInfo}
                />
              </div>
            </PreviewThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
