import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const steps = [
  {
    title: "Fill in your details",
    description:
      "Add experience, education, skills, and more with our guided form.",
  },
  {
    title: "Preview in real time",
    description:
      "See your resume update instantly as you type — no refresh needed.",
  },
  {
    title: "Download & apply",
    description:
      "Export a polished resume and start applying to your dream roles.",
  },
];

const Steps = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent dark:via-slate-700/60" />

      <SectionHeader
        label="How it works"
        title="Three steps to a standout resume"
      />

      <div className="relative mt-14 grid gap-6 md:grid-cols-3">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-10 hidden h-px bg-gradient-to-r from-brand-200/0 via-brand-300/50 to-brand-200/0 md:block dark:via-brand-500/30"
        />

        {steps.map((step, index) => (
          <Reveal key={step.title} className="h-full" delay={index * 100} direction="up">
            <div className="home-card group h-full p-6 sm:p-7">
              <span className="step-badge relative z-10">{index + 1}</span>
              <h3 className="relative z-10 mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Steps;
