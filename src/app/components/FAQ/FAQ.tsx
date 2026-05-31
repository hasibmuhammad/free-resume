import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { FAQ_ITEMS } from "@/lib/faqContent";

const FAQ = () => {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-700/60" />

      <SectionHeader label="FAQ" title="Common questions" />

      <div className="mt-12 space-y-3">
        {FAQ_ITEMS.map(({ question, answer }, index) => (
          <Reveal key={question} delay={index * 60} direction="up">
            <details className="faq-item group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 transition-colors duration-200 hover:text-brand-600 dark:text-white dark:hover:text-brand-300 [&::-webkit-details-marker]:hidden">
                {question}
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-base text-slate-500 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-100 group-open:text-brand-600 dark:bg-slate-800 dark:text-slate-400 dark:group-open:bg-brand-500/20 dark:group-open:text-brand-300"
                >
                  +
                </span>
              </summary>
              <div className="faq-content">
                <div className="faq-content-inner">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {answer}
                  </p>
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
