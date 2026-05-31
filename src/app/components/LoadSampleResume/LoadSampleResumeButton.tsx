"use client";

import { createSampleResumeDraft } from "@/lib/sampleResume";
import { isResumeEmpty, saveResumeDraft } from "@/lib/resumeDraft";
import { markSaved } from "@/redux/features/draftSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateResume, store } from "@/redux/store";
import { HiOutlineDocumentText } from "react-icons/hi2";

type LoadSampleResumeButtonProps = {
  variant?: "default" | "toolbar";
};

export function LoadSampleResumeButton({
  variant = "default",
}: LoadSampleResumeButtonProps) {
  const dispatch = useAppDispatch();
  const isEmpty = useAppSelector((state) => isResumeEmpty(state));
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);

  const handleLoad = () => {
    if (
      !isEmpty &&
      !window.confirm(
        "Replace your current resume with the ATS-friendly sample? Unsaved changes will be lost."
      )
    ) {
      return;
    }

    const sample = createSampleResumeDraft();
    dispatch(hydrateResume(sample));
    saveResumeDraft(store.getState());
    dispatch(markSaved(new Date().toISOString()));
  };

  if (!isHydrated) return null;

  const isToolbar = variant === "toolbar";

  return (
    <button
      type="button"
      onClick={handleLoad}
      className={
        isToolbar
          ? "inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:flex-none sm:justify-start sm:px-3 dark:text-slate-300 dark:hover:bg-slate-800/80"
          : "flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
      }
      title="Load a complete sample resume (experience, education, skills, projects)"
    >
      <HiOutlineDocumentText aria-hidden className="h-4 w-4 shrink-0 opacity-70" />
      <span className="whitespace-nowrap">Sample</span>
    </button>
  );
}
