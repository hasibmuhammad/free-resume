"use client";

import { useEffect, useId, useRef, useState } from "react";
import { HiOutlineChevronDown, HiOutlineFolder } from "react-icons/hi2";
import {
  BackupButton,
  RestoreButton,
} from "../BackupRestore/BackupRestoreButtons";
import { ImportResumeButton } from "../ImportResume/ImportResumeButton";
import { LoadSampleResumeButton } from "../LoadSampleResume/LoadSampleResumeButton";

export function FileMenu() {
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${
          open ? "bg-slate-50 dark:bg-slate-800" : ""
        }`}
      >
        <HiOutlineFolder aria-hidden className="h-4 w-4 opacity-70" />
        File
        <HiOutlineChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Stays mounted so hidden file inputs survive while native dialogs are open */}
      <div
        id={menuId}
        onClick={() => setOpen(false)}
        className={`absolute left-0 z-[60] mt-2 flex w-52 flex-col items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-elevated dark:border-slate-700 dark:bg-slate-900 [&_button]:!h-9 [&_button]:!w-full [&_button]:!flex-none [&_button]:!justify-start [&_button]:!px-3 ${
          open ? "" : "hidden"
        }`}
      >
        <LoadSampleResumeButton variant="toolbar" />
        <ImportResumeButton variant="toolbar" />
        <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" aria-hidden />
        <BackupButton />
        <RestoreButton />
      </div>
    </div>
  );
}
