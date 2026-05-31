"use client";

import {
  getAtsParseRateSummary,
  getAtsScoreColor,
  getAtsScoreLabel,
} from "@/lib/atsScore";
import { useEffect, useId, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { CheckRow, ParseRateBar, ScoreRing } from "./AtsUi";
import { useAtsReport } from "./useAtsReport";

type AtsCheckerProps = {
  variant?: "default" | "toolbar";
};

export function AtsChecker({ variant = "default" }: AtsCheckerProps) {
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { report, status, error } = useAtsReport();

  const colors = getAtsScoreColor(report.parseRate);
  const label = getAtsScoreLabel(report.parseRate);
  const isAnalyzing = status === "analyzing";
  const sortedChecks = [...report.checks].sort((a, b) => {
    const rank = { fail: 0, warn: 1, pass: 2 };
    return rank[a.status] - rank[b.status];
  });

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

  const isToolbar = variant === "toolbar";
  const ringSize = isToolbar ? "xs" : "md";

  return (
    <div ref={containerRef} className="relative min-w-0 flex-1 sm:flex-none">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={
          isToolbar
            ? `inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 px-2 text-left transition-colors hover:bg-slate-50 sm:flex-none sm:justify-start sm:gap-2 sm:px-3 dark:hover:bg-slate-800/80 ${
                open ? "bg-slate-50 dark:bg-slate-800/80" : ""
              }`
            : `flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1.5 text-left transition-all duration-200 hover:border-brand-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-brand-500/40 ${
                open ? "shadow-soft ring-2 ring-brand-200/60 dark:ring-brand-500/30" : ""
              }`
        }
        title="ATS parse rate — % of resume fields structured by PDF parser"
      >
        <ScoreRing score={report.parseRate} size={ringSize} />
        {isToolbar ? (
          <>
            <span className="min-w-0 text-center sm:text-left">
              <span className="block text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {isAnalyzing ? "Parsing…" : "ATS"}
              </span>
              <span className={`block truncate text-xs font-semibold leading-tight ${colors.text}`}>
                {isAnalyzing ? "…" : (
                  <>
                    {report.parseRate}%
                    <span className="hidden min-[480px]:inline">{` · ${label}`}</span>
                  </>
                )}
              </span>
            </span>
            <HiOutlineChevronDown
              aria-hidden
              className={`hidden h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 min-[480px]:block ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        ) : (
          <>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {isAnalyzing ? "Parsing PDF…" : "Parse rate"}
              </span>
              <span className={`block text-xs font-semibold ${colors.text}`}>
                {isAnalyzing ? "…" : label}
              </span>
            </span>
            <HiOutlineChevronDown
              aria-hidden
              className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:block ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-elevated dark:border-slate-700 dark:bg-slate-900"
        >
          <div
            className={`border-b border-slate-200/70 px-4 py-3 dark:border-slate-700/70 ${colors.bg}`}
          >
            <div className="flex items-center gap-3">
              <ScoreRing score={report.parseRate} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  ATS parse rate
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isAnalyzing
                    ? "Generating PDF and extracting text…"
                    : error
                      ? error
                      : getAtsParseRateSummary(
                          report.parseRate,
                          report.parsedFieldCount,
                          report.totalFieldCount,
                          report.missingRequiredCount ?? 0
                        )}
                </p>
                {!error && !isAnalyzing && report.totalFieldCount > 0 ? (
                  <ParseRateBar
                    parseRate={report.parseRate}
                    className="mt-2"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {!error && isAnalyzing ? (
            <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Generating PDF and running parser…
            </div>
          ) : null}

          {!error && !isAnalyzing ? (
            <ul className="scrollbar-thin max-h-72 divide-y divide-slate-100 overflow-y-auto px-4 dark:divide-slate-800">
              {sortedChecks.map((check) => (
                <CheckRow key={check.id} check={check} />
              ))}
            </ul>
          ) : null}

          {error ? (
            <p className="px-4 py-3 text-xs text-red-600 dark:text-red-400">{error}</p>
          ) : null}

          <p className="border-t border-slate-200/70 px-4 py-2.5 text-[11px] leading-relaxed text-slate-500 dark:border-slate-700/70 dark:text-slate-400">
            Like Enhancv&apos;s ATS parse rate: measures how much of your exported
            PDF an ATS parser can structure into fields — not job-match scoring.
          </p>
        </div>
      ) : null}
    </div>
  );
}
