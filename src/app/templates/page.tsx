import { pageMetadata, absoluteUrl, SITE_NAME } from "@/lib/seo";
import { TEMPLATE_LIST } from "@/lib/templates/registry";
import { TEMPLATE_PAGE_CONTENT } from "@/lib/templates/templateContent";
import type { Metadata } from "next";
import Link from "next/link";
import { ResumeShowcase } from "../components/Preview/ResumeShowcase";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeader } from "../components/ui/SectionHeader";

export const metadata: Metadata = pageMetadata({
  title: "Free Resume Templates — ATS-Friendly & Professional",
  description:
    "Browse free, ATS-friendly resume templates: modern two-column, classic, executive, tech, elegant, and minimal designs. Live preview and PDF download — no sign-up.",
  path: "/templates",
});

function TemplatesJsonLd() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} resume templates`,
    itemListElement: TEMPLATE_LIST.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: template.name,
      url: absoluteUrl(`/templates/${template.id}`),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

export default function TemplatesPage() {
  return (
    <>
      <TemplatesJsonLd />
      <div className="page-bg">
        <section className="saas-section">
          <SectionHeader
            label="Templates"
            title="Free resume templates that pass ATS scans"
            description="Every template exports as real, selectable text — not an image — so applicant tracking systems can read every line. Pick one and customize colors and fonts in the editor."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATE_LIST.map((template, index) => {
              const content = TEMPLATE_PAGE_CONTENT[template.id];
              return (
                <Reveal key={template.id} delay={index * 60}>
                  <article className="saas-panel group flex h-full flex-col overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                    <Link
                      href={`/templates/${template.id}`}
                      className="block"
                      aria-label={`${template.name} resume template details`}
                    >
                      <ResumeShowcase
                        templateId={template.id}
                        variant="template"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {template.layoutMode === "split"
                          ? "Two-column"
                          : "Single-column"}
                      </p>
                      <h2 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                        {template.name}
                      </h2>
                      <p className="mt-1.5 flex-1 text-sm leading-snug text-slate-500 dark:text-slate-400">
                        {content.headline}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <Link
                          href={`/create-resume?template=${template.id}`}
                          className="btn-primary !px-4 !py-2 text-xs"
                        >
                          Use template
                        </Link>
                        <Link
                          href={`/templates/${template.id}`}
                          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
