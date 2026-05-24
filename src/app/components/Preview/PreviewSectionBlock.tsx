import { ReactNode } from "react";

interface PreviewSectionBlockProps {
  title: string;
  children: ReactNode;
}

export function PreviewSectionBlock({ title, children }: PreviewSectionBlockProps) {
  return (
    <section className="mb-5 last:mb-0">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-0.5 w-7 rounded-full bg-sky-600 dark:bg-sky-400" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

interface PreviewEntryProps {
  title: string;
  subtitle?: string;
  meta?: string;
  dateRange?: string;
  details?: string;
  extra?: string;
}

export function PreviewEntry({
  title,
  subtitle,
  meta,
  dateRange,
  details,
  extra,
}: PreviewEntryProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {dateRange && (
          <span className="shrink-0 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
            {dateRange}
          </span>
        )}
      </div>
      {subtitle ? (
        <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
          {subtitle}
        </p>
      ) : null}
      {meta ? (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{meta}</p>
      ) : null}
      {details && (
        <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          {details}
        </p>
      )}
      {extra && (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{extra}</p>
      )}
    </div>
  );
}
