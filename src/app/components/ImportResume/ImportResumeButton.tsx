"use client";

import { importResumeFromPdfFile } from "@/lib/importResumeFromPdf";
import { isResumeEmpty, saveResumeDraft } from "@/lib/resumeDraft";
import { markSaved } from "@/redux/features/draftSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateResume, store } from "@/redux/store";
import { useRef, useState } from "react";
import { HiOutlineArrowUpTray } from "react-icons/hi2";

type ImportResumeButtonProps = {
  variant?: "default" | "toolbar";
};

export function ImportResumeButton({
  variant = "default",
}: ImportResumeButtonProps) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEmpty = useAppSelector((state) => isResumeEmpty(state));
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);
  const isToolbar = variant === "toolbar";

  const handlePickFile = () => {
    setError(null);
    inputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (
      !isEmpty &&
      !window.confirm(
        "Replace your current resume with the uploaded PDF? Unsaved changes will be lost."
      )
    ) {
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const { draft } = await importResumeFromPdfFile(file);
      dispatch(hydrateResume(draft));
      saveResumeDraft(store.getState());
      dispatch(markSaved(new Date().toISOString()));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not import PDF.";
      setError(message);
      if (isToolbar) {
        window.alert(message);
      }
    } finally {
      setImporting(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        aria-hidden
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handlePickFile}
        disabled={importing}
        className={
          isToolbar
            ? "inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 sm:flex-none sm:justify-start sm:px-3 dark:text-slate-300 dark:hover:bg-slate-800/80"
            : "flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:cursor-wait disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
        }
        title="Upload an existing PDF resume to pre-fill the editor"
      >
        <HiOutlineArrowUpTray aria-hidden className="h-4 w-4 shrink-0 opacity-70" />
        <span className="whitespace-nowrap">{importing ? "Importing…" : "Import PDF"}</span>
      </button>
      {error && isToolbar ? (
        <span className="sr-only" role="alert">
          {error}
        </span>
      ) : null}
      {error && !isToolbar ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
