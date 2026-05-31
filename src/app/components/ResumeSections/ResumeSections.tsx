import Link from "next/link";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const sections = [
  {
    title: "Experience",
    description:
      "Highlight roles, companies, dates, and bullet-point accomplishments that show impact.",
    preview: (
      <div className="space-y-2">
        <div className="h-2.5 w-28 rounded bg-slate-800 transition-colors duration-300 group-hover:bg-brand-900" />
        <div className="section-preview-line h-1.5 w-20" />
        <div className="mt-2 space-y-1 pl-2">
          <div className="section-preview-line h-1.5 w-full" />
          <div className="section-preview-line h-1.5 w-11/12" />
          <div className="section-preview-line h-1.5 w-10/12" />
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    description:
      "Add degrees, institutions, and graduation dates in a clear, scannable format.",
    preview: (
      <div className="space-y-2">
        <div className="h-2.5 w-32 rounded bg-slate-800 transition-colors duration-300 group-hover:bg-brand-900" />
        <div className="section-preview-line h-1.5 w-24" />
        <div className="section-preview-line h-1.5 w-16" />
      </div>
    ),
  },
  {
    title: "Projects",
    description:
      "Showcase side projects, open-source work, or portfolio pieces with dates and key features.",
    preview: (
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-2.5 w-24 rounded bg-slate-800 transition-colors duration-300 group-hover:bg-brand-900" />
          <div className="section-preview-line h-1.5 w-14" />
        </div>
        <div className="space-y-1 pl-2">
          <div className="section-preview-line h-1.5 w-full" />
          <div className="section-preview-line h-1.5 w-4/5" />
        </div>
      </div>
    ),
  },
  {
    title: "Skills",
    description:
      "List technical and soft skills in a compact sidebar — easy to scan at a glance.",
    preview: (
      <div className="flex flex-wrap gap-1.5">
        {["React", "TypeScript", "Node.js", "Git"].map((skill, i) => (
          <span
            key={skill}
            className="rounded-md px-2 py-0.5 text-[10px] font-medium text-brand-700 ring-1 ring-brand-200/50 transition-transform duration-300 [background:linear-gradient(135deg,rgb(238_242_255),rgb(224_231_255))] group-hover:-translate-y-px"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    ),
  },
];

const ResumeSections = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-64 -translate-y-1/2 rounded-full bg-brand-400/5 blur-3xl lg:block dark:bg-brand-500/10" />

      <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        <div className="max-w-md lg:sticky lg:top-24">
          <SectionHeader
            align="left"
            label="Sections"
            title="Build every part of your story"
            description="Start with basic info and a summary, then add the sections that fit your background. Toggle visibility and reorder anytime."
          />
          <Reveal delay={200} direction="up">
            <Link href="/create-resume" className="btn-primary mt-8 inline-flex">
              Open the editor
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <div className="grid w-full flex-1 gap-4 sm:grid-cols-2">
          {sections.map(({ title, description, preview }, index) => (
            <Reveal key={title} className="h-full" delay={index * 90} direction="scale">
              <div className="home-card group h-full overflow-hidden">
                <div className="preview-paper border-b border-slate-100 p-4 transition-colors duration-300 group-hover:bg-slate-50/80">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-brand-500">
                    {title}
                  </p>
                  {preview}
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSections;
