"use client";

import { AtsChecker } from "../AtsChecker/AtsChecker";
import { DownloadPdfButton } from "../DownloadPdfButton/DownloadPdfButton";
import { FileMenu } from "./FileMenu";

export function EditorToolbar() {
  return (
    <div
      className="flex w-full items-center gap-2 lg:w-auto lg:shrink-0"
      role="toolbar"
      aria-label="Editor actions"
    >
      <FileMenu />
      <div className="flex h-9 items-stretch overflow-visible rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 [&>div>button]:!h-full [&>div>button]:rounded-lg">
        <AtsChecker variant="toolbar" />
      </div>
      <div className="ml-auto lg:ml-0">
        <DownloadPdfButton />
      </div>
    </div>
  );
}
