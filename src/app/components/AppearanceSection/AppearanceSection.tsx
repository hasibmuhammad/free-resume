"use client";

import { TemplateThemePanel } from "@/app/components/TemplateThemePanel/TemplateThemePanel";
import { FormBlock } from "@/app/components/ui/FormSection";
import { ChevronDown, Palette } from "lucide-react";
import { useState } from "react";

export function AppearanceSection() {
  const [open, setOpen] = useState(false);

  return (
    <FormBlock id="appearance-section">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 rounded-lg text-left transition-colors hover:opacity-90"
      >
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400">
            <Palette aria-hidden className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Appearance
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Template, colors, and fonts — preview updates as you change these.
            </p>
          </div>
        </div>
        <ChevronDown
          aria-hidden
          className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
          <TemplateThemePanel />
        </div>
      ) : null}
    </FormBlock>
  );
}
