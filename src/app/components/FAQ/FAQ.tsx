import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const faqs = [
  {
    question: "Is freeResume really free?",
    answer:
      "Yes — completely free with no hidden fees, premium tiers, or credit card required. Build and download your resume at no cost.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is needed. Open the editor and start typing. Your progress is saved automatically in your browser's local storage.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. When you're happy with your resume, use the download button in the preview panel to export a print-ready A4 PDF.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your resume data stays on your device in browser local storage. We don't upload your information to a server.",
  },
  {
    question: "Will my resume work with ATS systems?",
    answer:
      "Yes. On every edit we generate your PDF, extract its text with PDF.js, and parse it with the OpenResume algorithm — checking whether name, email, sections, experience, and skills are readable the way Greenhouse, Lever, and Workday would see them.",
  },
];

const FAQ = () => {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-700/60" />

      <SectionHeader label="FAQ" title="Common questions" />

      <div className="mt-12 space-y-3">
        {faqs.map(({ question, answer }, index) => (
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
