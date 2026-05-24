const steps = [
  {
    title: "Fill in your details",
    description: "Add experience, education, skills, and more with our guided form.",
  },
  {
    title: "Preview in real time",
    description: "See your resume update instantly as you type — no refresh needed.",
  },
  {
    title: "Download & apply",
    description: "Export a polished resume and start applying to your dream roles.",
  },
];

const Steps = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="text-center">
        <p className="section-label">How it works</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Three steps to a standout resume
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="card-surface group relative overflow-hidden p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <span className="step-badge">{index + 1}</span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
