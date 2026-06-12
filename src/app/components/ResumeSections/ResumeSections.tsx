import Link from "next/link";
import { SectionPreviewSnippet } from "../Preview/SectionPreviewSnippet";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const sections = [
  {
    title: "Experience",
    sectionKey: "experience" as const,
    description:
      "Highlight roles, companies, dates, and bullet-point accomplishments that show impact.",
  },
  {
    title: "Education",
    sectionKey: "education" as const,
    description:
      "Add degrees, institutions, and graduation dates in a clear, scannable format.",
  },
  {
    title: "Projects",
    sectionKey: "project" as const,
    description:
      "Showcase side projects, open-source work, or portfolio pieces with dates and key features.",
  },
  {
    title: "Skills",
    sectionKey: "skill" as const,
    description:
      "List technical and soft skills in a compact sidebar — easy to scan at a glance.",
  },
];

const ResumeSections = () => {
  return (
    <section className="saas-section">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-14">
        <div className="max-w-sm shrink-0 lg:sticky lg:top-24">
          <SectionHeader
            align="left"
            label="Sections"
            title="Build every part of your story"
            description="Start with basic info and a summary, then add the sections that fit your background. Toggle visibility and reorder anytime."
          />
          <Reveal delay={200} direction="up">
            <Link href="/create-resume" className="btn-primary mt-6 inline-flex">
              Open the editor
            </Link>
          </Reveal>
        </div>

        <div className="grid w-full flex-1 gap-3 sm:grid-cols-2">
          {sections.map(({ title, sectionKey, description }, index) => (
            <Reveal key={title} className="h-full" delay={index * 70} direction="up">
              <div className="saas-panel h-full overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <SectionPreviewSnippet section={sectionKey} />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
