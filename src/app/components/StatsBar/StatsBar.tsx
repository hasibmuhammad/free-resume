import { Reveal } from "../ui/Reveal";

const stats = [
  { value: "100%", label: "Free to use" },
  { value: "0", label: "Sign-up required" },
  { value: "PDF", label: "Instant export" },
  { value: "ATS", label: "Live score" },
];

const StatsBar = () => {
  return (
    <section className="relative border-y border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-50/30 via-transparent to-violet-50/30 dark:from-brand-950/20 dark:to-violet-950/20" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {stats.map(({ value, label }, index) => (
          <Reveal key={label} delay={index * 80} direction="fade">
            <div
              className={`px-4 py-10 text-center sm:px-6 lg:px-8 ${
                index > 0
                  ? "md:border-l md:border-slate-200/70 dark:md:border-slate-700/60"
                  : ""
              } ${index % 2 === 1 ? "border-l border-slate-200/70 dark:border-slate-700/60 md:border-l" : ""}`}
            >
              <p className="text-2xl font-bold tracking-tight text-gradient sm:text-3xl">
                {value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
                {label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
