import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { FAQ_ITEMS } from "@/lib/faqContent";

const FAQ = () => {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="saas-section mx-auto max-w-3xl">
        <SectionHeader label="FAQ" title="Common questions" />

        <div className="mt-8 space-y-2">
          {FAQ_ITEMS.map(({ question, answer }, index) => (
            <Reveal key={question} delay={index * 50} direction="up">
              <details className="faq-item group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium text-slate-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-400 [&::-webkit-details-marker]:hidden sm:px-5 sm:py-4">
                  {question}
                  <span
                    aria-hidden
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-sm text-slate-500 transition-all group-open:rotate-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                  >
                    +
                  </span>
                </summary>
                <div className="faq-content">
                  <div className="faq-content-inner">
                    <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:px-5">
                      {answer}
                    </p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
