"use client";

import { buildResumeDraft, isResumeEmpty, saveResumeDraft } from "@/lib/resumeDraft";
import { markSaved } from "@/redux/features/draftSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateResume, store } from "@/redux/store";
import { migrateResumeDraft } from "@/types/resumeDraft";
import { useRef, useState } from "react";
import { HiOutlineArrowDownOnSquare, HiOutlineArrowUpOnSquare } from "react-icons/hi2";

const TOOLBAR_BUTTON_CLASS =
  "inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60 sm:flex-none sm:justify-start sm:px-3 dark:text-slate-300 dark:hover:bg-slate-800/80";

function buildBackupFilename(fullName: string): string {
  const namePart = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const datePart = new Date().toISOString().slice(0, 10);
  return `${namePart || "resume"}-backup-${datePart}.json`;
}

export function BackupButton() {
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);
  const fullName = useAppSelector((state) => state.basicInfo.fullName);

  const handleBackup = () => {
    const draft = buildResumeDraft(store.getState());
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = buildBackupFilename(fullName);
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!isHydrated) return null;

  return (
    <button
      type="button"
      onClick={handleBackup}
      className={TOOLBAR_BUTTON_CLASS}
      title="Download your resume data as a JSON backup file"
    >
      <HiOutlineArrowDownOnSquare aria-hidden className="h-4 w-4 shrink-0 opacity-70" />
      <span className="whitespace-nowrap">Backup</span>
    </button>
  );
}

export function RestoreButton() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [restoring, setRestoring] = useState(false);
  const isEmpty = useAppSelector((state) => isResumeEmpty(state));
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (
      !isEmpty &&
      !window.confirm(
        "Replace your current resume with the backup file? Unsaved changes will be lost."
      )
    ) {
      return;
    }

    setRestoring(true);
    try {
      const text = await file.text();
      const draft = migrateResumeDraft(JSON.parse(text));
      if (!draft) {
        throw new Error(
          "This file doesn't look like a freeResume backup. Pick a .json file exported with the Backup button."
        );
      }
      dispatch(hydrateResume(draft));
      saveResumeDraft(store.getState());
      dispatch(markSaved(new Date().toISOString()));
    } catch (err) {
      window.alert(
        err instanceof Error ? err.message : "Could not restore the backup file."
      );
    } finally {
      setRestoring(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        aria-hidden
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={restoring}
        className={TOOLBAR_BUTTON_CLASS}
        title="Restore your resume from a JSON backup file"
      >
        <HiOutlineArrowUpOnSquare aria-hidden className="h-4 w-4 shrink-0 opacity-70" />
        <span className="whitespace-nowrap">
          {restoring ? "Restoring…" : "Restore"}
        </span>
      </button>
    </>
  );
}
