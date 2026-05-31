"use client";

import { FaMinus, FaPlus } from "react-icons/fa";

interface PreviewZoomControlsProps {
  scale: number;
  autoFit: boolean;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetFit: () => void;
}

export function PreviewZoomControls({
  scale,
  autoFit,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onResetFit,
}: PreviewZoomControlsProps) {
  const percent = Math.round(scale * 100);

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onResetFit}
        className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
          autoFit
            ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        }`}
        title="Fit preview to panel"
      >
        Fit
      </button>

      <div className="flex items-center rounded-md border border-slate-200/80 bg-white/80 dark:border-slate-700/60 dark:bg-slate-800/50">
        <button
          type="button"
          onClick={onZoomOut}
          disabled={!canZoomOut}
          className="rounded-l-md px-1.5 py-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <FaMinus className="h-2.5 w-2.5" aria-hidden />
        </button>

        <span
          className="min-w-[2.75rem] border-x border-slate-200/80 px-1.5 py-1 text-center text-[11px] font-medium tabular-nums text-slate-600 dark:border-slate-700/60 dark:text-slate-300"
          aria-live="polite"
        >
          {percent}%
        </span>

        <button
          type="button"
          onClick={onZoomIn}
          disabled={!canZoomIn}
          className="rounded-r-md px-1.5 py-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <FaPlus className="h-2.5 w-2.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
