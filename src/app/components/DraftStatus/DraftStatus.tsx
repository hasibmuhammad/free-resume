"use client";

import { useAppSelector } from "@/redux/hooks";

function formatSavedTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function DraftStatus() {
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);
  const isSaving = useAppSelector((state) => state.draft.isSaving);
  const hasUnsavedChanges = useAppSelector(
    (state) => state.draft.hasUnsavedChanges
  );
  const lastSavedAt = useAppSelector((state) => state.draft.lastSavedAt);

  if (!isHydrated) return null;

  let label = "Draft saved locally";
  let dotClass = "bg-emerald-500";

  if (isSaving || hasUnsavedChanges) {
    label = "Saving draft…";
    dotClass = "bg-amber-400 animate-pulse";
  } else if (lastSavedAt) {
    const time = formatSavedTime(lastSavedAt);
    label = time ? `Draft saved · ${time}` : "Draft saved locally";
  }

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400"
      title="Your progress is auto-saved in this browser"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {label}
    </div>
  );
}
