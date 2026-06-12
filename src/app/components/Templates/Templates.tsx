"use client";

import Link from "next/link";
import { TEMPLATE_LIST } from "@/lib/templates/registry";
import { ResumeShowcase } from "../Preview/ResumeShowcase";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const FEATURED_TEMPLATES = TEMPLATE_LIST.slice(0, 4);

const Templates = () => {
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="saas-section">
        <SectionHeader
          label="Templates"
          title="Professional layouts, ready to use"
          description="ATS-friendly designs with clean typography. Pick a template and customize colors and fonts in the editor."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURED_TEMPLATES.map((template, index) => (
            <Reveal key={template.id} delay={index * 60}>
              <article className="saas-panel group overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                <div className="flex items-stretch gap-0 sm:gap-1">
                  <div className="flex shrink-0 items-center justify-center border-r border-slate-100 bg-slate-100/60 p-3 dark:border-slate-800 dark:bg-slate-800/40">
                    <ResumeShowcase
                      templateId={template.id}
                      variant="template-compact"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {template.layoutMode === "split"
                        ? "Two-column"
                        : "Single-column"}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
                      {template.description}
                    </p>
                    <Link
                      href={`/create-resume?template=${template.id}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      Use template
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="mt-8 text-center">
            <Link href="/templates" className="btn-secondary">
              Browse all {TEMPLATE_LIST.length} templates
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Templates;
