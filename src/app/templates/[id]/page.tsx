import { pageMetadata } from "@/lib/seo";
import {
  RESUME_TEMPLATES,
  TEMPLATE_LIST,
  isResumeTemplateId,
} from "@/lib/templates/registry";
import { TEMPLATE_PAGE_CONTENT } from "@/lib/templates/templateContent";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineCheck } from "react-icons/hi2";
import { ResumeShowcase } from "../../components/Preview/ResumeShowcase";

type TemplatePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return TEMPLATE_LIST.map((template) => ({ id: template.id }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { id } = await params;
  if (!isResumeTemplateId(id)) return {};

  const content = TEMPLATE_PAGE_CONTENT[id];
  return pageMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    path: `/templates/${id}`,
  });
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { id } = await params;
  if (!isResumeTemplateId(id)) notFound();

  const template = RESUME_TEMPLATES[id];
  const content = TEMPLATE_PAGE_CONTENT[id];
  const otherTemplates = TEMPLATE_LIST.filter((t) => t.id !== id).slice(0, 3);

  return (
    <div className="page-bg">
      <section className="saas-section">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <li>
              <Link
                href="/templates"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                Templates
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-900 dark:text-white">
              {template.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="max-w-xl">
            <p className="section-label">
              {template.layoutMode === "split"
                ? "Two-column template"
                : "Single-column template"}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {template.name} resume template
            </h1>
            <p className="mt-2 text-lg font-medium text-slate-700 dark:text-slate-300">
              {content.headline}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {content.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/create-resume?template=${template.id}`}
                className="btn-primary w-full sm:w-auto"
              >
                Use this template — free
              </Link>
              <Link href="/templates" className="btn-secondary w-full sm:w-auto">
                Browse all templates
              </Link>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Best for
                </h2>
                <ul className="mt-3 space-y-2">
                  {content.bestFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-snug text-slate-600 dark:text-slate-400"
                    >
                      <HiOutlineCheck
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Highlights
                </h2>
                <ul className="mt-3 space-y-2">
                  {content.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-snug text-slate-600 dark:text-slate-400"
                    >
                      <HiOutlineCheck
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full max-w-sm shrink-0 lg:max-w-md">
            <div className="product-frame">
              <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Template preview
              </p>
              <ResumeShowcase templateId={template.id} variant="hero" />
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-200/80 pt-12 dark:border-slate-800">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            More templates
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {otherTemplates.map((other) => (
              <Link
                key={other.id}
                href={`/templates/${other.id}`}
                className="saas-panel group flex items-center gap-4 p-3 transition-colors hover:border-slate-300 dark:hover:border-slate-600"
              >
                <ResumeShowcase
                  templateId={other.id}
                  variant="template-compact"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {other.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-snug text-slate-500 dark:text-slate-400">
                    {TEMPLATE_PAGE_CONTENT[other.id].headline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
