"use client";

import Link from "next/link";
import { TEMPLATE_LIST } from "@/lib/templates/registry";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

function TemplatePreviewMock({ layoutMode }: { layoutMode: "split" | "single" }) {
  if (layoutMode === "split") {
    return (
      <div className="flex gap-2 p-4">
        <div className="min-w-0 flex-[1.85] space-y-2">
          <div className="h-2 w-16 rounded bg-slate-300" />
          <div className="space-y-1 pl-1">
            <div className="h-1.5 w-full rounded bg-slate-100" />
            <div className="h-1.5 w-11/12 rounded bg-slate-100" />
            <div className="h-1.5 w-10/12 rounded bg-slate-100" />
          </div>
          <div className="h-2 w-14 rounded bg-slate-300" />
          <div className="space-y-1 pl-1">
            <div className="h-1.5 w-full rounded bg-slate-100" />
            <div className="h-1.5 w-4/5 rounded bg-slate-100" />
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2 border-l border-slate-100 pl-2">
          <div className="h-2 w-10 rounded bg-slate-300" />
          <div className="flex flex-wrap gap-1">
            <div className="h-1.5 w-8 rounded bg-slate-100" />
            <div className="h-1.5 w-10 rounded bg-slate-100" />
            <div className="h-1.5 w-7 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4">
      <div className="h-2 w-16 rounded bg-slate-300" />
      <div className="space-y-1 pl-1">
        <div className="h-1.5 w-full rounded bg-slate-100" />
        <div className="h-1.5 w-11/12 rounded bg-slate-100" />
      </div>
      <div className="h-2 w-14 rounded bg-slate-300" />
      <div className="space-y-1 pl-1">
        <div className="h-1.5 w-full rounded bg-slate-100" />
        <div className="h-1.5 w-10/12 rounded bg-slate-100" />
      </div>
      <div className="h-2 w-12 rounded bg-slate-300" />
      <div className="flex flex-wrap gap-1 pl-1">
        <div className="h-1.5 w-8 rounded bg-slate-100" />
        <div className="h-1.5 w-10 rounded bg-slate-100" />
      </div>
    </div>
  );
}

const Templates = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          label="Templates"
          title="Pick a layout that fits your story"
          description="Start with a two-column modern layout or a classic single-column design. Customize colors and fonts anytime in the editor."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {TEMPLATE_LIST.map((template, index) => (
          <Reveal key={template.id} delay={index * 80}>
            <article className="home-card group flex h-full flex-col overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <div className="panel-header !px-4 !py-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {template.layoutMode === "split"
                      ? "Two columns"
                      : "Single column"}
                  </span>
                </div>
                <div
                  className="preview-paper mx-4 mb-4 overflow-hidden rounded-lg border border-slate-100 shadow-sm"
                  style={{
                    borderTopColor: template.defaultTheme.primary,
                    borderTopWidth: 3,
                  }}
                >
                  <div className="px-4 pt-3">
                    <div
                      className="h-2.5 w-24 rounded"
                      style={{ backgroundColor: template.defaultTheme.primary }}
                    />
                    <div
                      className="mt-1 h-1.5 w-16 rounded"
                      style={{ backgroundColor: template.defaultTheme.secondary }}
                    />
                  </div>
                  <TemplatePreviewMock layoutMode={template.layoutMode} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {template.description}
                </p>
                <Link
                  href={`/create-resume?template=${template.id}`}
                  className="btn-primary mt-5 w-full sm:w-auto"
                >
                  Use this template
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Templates;
