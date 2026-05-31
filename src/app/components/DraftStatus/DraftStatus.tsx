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

type DraftStatusProps = {
  variant?: "default" | "toolbar";
};

export function DraftStatus({ variant = "default" }: DraftStatusProps) {
  const isHydrated = useAppSelector((state) => state.draft.isHydrated);
  const isSaving = useAppSelector((state) => state.draft.isSaving);
  const hasUnsavedChanges = useAppSelector(
    (state) => state.draft.hasUnsavedChanges
  );
  const lastSavedAt = useAppSelector((state) => state.draft.lastSavedAt);

  if (!isHydrated) return null;

  let label = "Saved locally";
  let dotClass = "bg-emerald-500";

  if (isSaving || hasUnsavedChanges) {
    label = "Saving…";
    dotClass = "bg-amber-400 animate-pulse";
  } else if (lastSavedAt) {
    const time = formatSavedTime(lastSavedAt);
    label = time ? `Saved ${time}` : "Saved locally";
  }

  const isToolbar = variant === "toolbar";

  return (
    <div
      className={
        isToolbar
          ? "inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-xs text-slate-500 sm:flex-none sm:justify-start sm:px-3 dark:text-slate-400"
          : "flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400"
      }
      title="Your progress is auto-saved in this browser"
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
      <span className="whitespace-nowrap">
        {isSaving || hasUnsavedChanges ? (
          <>
            Saving
            <span className="hidden min-[440px]:inline">…</span>
          </>
        ) : (
          <>
            <span className="min-[440px]:hidden">Saved</span>
            <span className="hidden min-[440px]:inline">{label}</span>
          </>
        )}
      </span>
    </div>
  );
}
