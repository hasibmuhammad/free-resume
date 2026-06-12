"use client";

import { scanUploadedResume, UploadedScanReport } from "@/lib/atsScanUpload";
import { getAtsScoreColor, groupChecksByCategory } from "@/lib/atsScore";
import { parsedResumeToDraft } from "@/lib/parsedResumeToDraft";
import { isResumeEmpty, saveResumeDraft } from "@/lib/resumeDraft";
import { markSaved } from "@/redux/features/draftSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hydrateResume, store } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineCloudArrowUp,
  HiOutlineExclamationTriangle,
  HiOutlineLockClosed,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { CheckRow, ScoreRing } from "../components/AtsChecker/AtsUi";

type ScanState =
  | { status: "idle" }
  | { status: "scanning"; fileName: string }
  | { status: "done"; report: UploadedScanReport }
  | { status: "error"; message: string };

function getScanScoreLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs improvement";
  return "Poor";
}

function SummaryChip({
  count,
  label,
  tone,
}: {
  count: number;
  label: string;
  tone: "pass" | "warn" | "fail";
}) {
  const Icon =
    tone === "pass"
      ? HiOutlineCheckCircle
      : tone === "warn"
        ? HiOutlineExclamationTriangle
        : HiOutlineXCircle;
  const color =
    tone === "pass"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "warn"
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <Icon aria-hidden className={`h-4 w-4 ${color}`} />
      {count} {label}
    </span>
  );
}

function UploadZone({
  onFile,
  disabled,
}: {
  onFile: (file: File) => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setDragOver(false);
      const file = event.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
        dragOver
          ? "border-brand-400 bg-brand-50/60 dark:border-brand-500 dark:bg-brand-500/10"
          : "border-slate-300 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-900/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        aria-hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onFile(file);
        }}
      />
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-2xl text-brand-600 dark:text-brand-400">
        <HiOutlineCloudArrowUp aria-hidden />
      </span>
      <p className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
        Drop a resume PDF here
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Yours or anyone&apos;s — up to 10 MB
      </p>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="btn-primary mt-5 disabled:cursor-wait disabled:opacity-60"
      >
        Choose PDF file
      </button>
      <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <HiOutlineLockClosed aria-hidden className="h-3.5 w-3.5" />
        Scanned 100% in your browser — the file never leaves your device
      </p>
    </div>
  );
}

function ScanReport({
  report,
  onReset,
}: {
  report: UploadedScanReport;
  onReset: () => void;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEmpty = useAppSelector((state) => isResumeEmpty(state));
  const colors = getAtsScoreColor(report.score);
  const groups = groupChecksByCategory(report.checks);

  const handleEditInBuilder = () => {
    if (
      !isEmpty &&
      !window.confirm(
        "Load this scanned resume into the editor? Your current draft will be replaced."
      )
    ) {
      return;
    }
    const draft = parsedResumeToDraft(report.parsed);
    dispatch(hydrateResume(draft));
    saveResumeDraft(store.getState());
    dispatch(markSaved(new Date().toISOString()));
    router.push("/create-resume");
  };

  return (
    <div className="space-y-6">
      <div className="saas-panel overflow-hidden">
        <div className={`border-b border-slate-200/70 px-5 py-4 dark:border-slate-700/70 ${colors.bg}`}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <ScoreRing score={report.score} size="lg" />
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {getScanScoreLabel(report.score)} — {report.score}/100
              </p>
              <p className="mt-0.5 truncate text-sm text-slate-600 dark:text-slate-400">
                {report.fileName} · ~{report.wordCount} words
                {report.isMultiColumn ? " · multi-column layout" : ""}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <SummaryChip count={report.passCount} label="passed" tone="pass" />
                <SummaryChip count={report.warnCount} label="to improve" tone="warn" />
                <SummaryChip count={report.failCount} label="critical" tone="fail" />
              </div>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="btn-secondary !px-4 !py-2 text-xs"
            >
              <HiOutlineArrowPath aria-hidden className="h-3.5 w-3.5" />
              Scan another
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {groups.map((group) => {
            const failCount = group.checks.filter((c) => c.status !== "pass").length;
            return (
              <section key={group.category} className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {group.label}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {group.checks.length - failCount}/{group.checks.length} passed
                  </span>
                </div>
                <ul className="mt-1 divide-y divide-slate-100 dark:divide-slate-800">
                  {group.checks.map((check) => (
                    <CheckRow key={check.id} check={check} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <div className="saas-panel flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Fix these issues in minutes
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Load the scanned content into the free editor — keep what parsed,
            fix what didn&apos;t, and export an ATS-clean PDF.
          </p>
        </div>
        <button type="button" onClick={handleEditInBuilder} className="btn-primary shrink-0">
          Edit this resume free
        </button>
      </div>
    </div>
  );
}

export function ResumeCheckerClient() {
  const [state, setState] = useState<ScanState>({ status: "idle" });

  const handleFile = useCallback(async (file: File) => {
    setState({ status: "scanning", fileName: file.name });
    try {
      const report = await scanUploadedResume(file);
      setState({ status: "done", report });
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Could not scan this PDF.",
      });
    }
  }, []);

  return (
    <div className="page-bg">
      <section className="saas-section !max-w-3xl">
        <div className="text-center">
          <p className="section-label">ATS resume checker</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Will your resume pass the robots?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Upload any resume PDF and get an instant compatibility report — the
            same parsing pipeline applicant tracking systems use, with concrete
            fixes ranked by impact.
          </p>
        </div>

        <div className="mt-10">
          {state.status === "idle" ? (
            <UploadZone onFile={handleFile} disabled={false} />
          ) : null}

          {state.status === "scanning" ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
              <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
              <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                Parsing {state.fileName}…
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Extracting text, detecting sections, scoring 17 checks
              </p>
            </div>
          ) : null}

          {state.status === "error" ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-500/30 dark:bg-red-500/10">
              <p className="text-sm font-medium text-red-700 dark:text-red-300">
                {state.message}
              </p>
              <button
                type="button"
                onClick={() => setState({ status: "idle" })}
                className="btn-secondary mt-4"
              >
                Try another file
              </button>
            </div>
          ) : null}

          {state.status === "done" ? (
            <ScanReport
              report={state.report}
              onReset={() => setState({ status: "idle" })}
            />
          ) : null}
        </div>

        {state.status === "idle" ? (
          <div className="mt-10 grid gap-4 text-center sm:grid-cols-3">
            {[
              {
                title: "17 weighted checks",
                detail: "Contact parsing, section structure, keywords, quantified impact, and more.",
              },
              {
                title: "Real ATS parsing",
                detail: "Built on the OpenResume extraction pipeline — not a keyword guess.",
              },
              {
                title: "Private by design",
                detail: "Everything runs locally in your browser. No upload, no account.",
              },
            ].map((item) => (
              <div key={item.title} className="saas-panel p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
