import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const steps = [
  {
    title: "Fill in your details",
    description:
      "Add experience, education, skills, and more with a guided editor.",
  },
  {
    title: "Preview in real time",
    description:
      "See your resume update instantly as you type — no refresh needed.",
  },
  {
    title: "Download & apply",
    description:
      "Export a polished PDF and start applying with confidence.",
  },
];

const Steps = () => {
  return (
    <section className="saas-section">
      <SectionHeader
        label="How it works"
        title="Three steps to a standout resume"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} className="h-full" delay={index * 80} direction="up">
            <div className="home-card h-full p-6">
              <span className="step-badge">{index + 1}</span>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
