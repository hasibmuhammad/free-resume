"use client";

import { AtsChecker } from "../AtsChecker/AtsChecker";
import { DraftStatus } from "../DraftStatus/DraftStatus";
import { ImportResumeButton } from "../ImportResume/ImportResumeButton";
import { LoadSampleResumeButton } from "../LoadSampleResume/LoadSampleResumeButton";

function ToolbarDivider() {
  return (
    <div
      className="w-px shrink-0 self-stretch bg-slate-200/90 dark:bg-slate-700/80"
      aria-hidden
    />
  );
}

export function EditorToolbar() {
  return (
    <div className="w-full overflow-visible lg:w-auto lg:shrink-0">
      <div
        className="flex w-full items-stretch overflow-visible rounded-xl border border-slate-200/80 bg-white shadow-sm sm:inline-flex sm:w-auto dark:border-slate-700/80 dark:bg-slate-900"
        role="toolbar"
        aria-label="Editor actions"
      >
        <LoadSampleResumeButton variant="toolbar" />
        <ToolbarDivider />
        <ImportResumeButton variant="toolbar" />
        <ToolbarDivider />
        <AtsChecker variant="toolbar" />
        <ToolbarDivider />
        <DraftStatus variant="toolbar" />
      </div>
    </div>
  );
}
