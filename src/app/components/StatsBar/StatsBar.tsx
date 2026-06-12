import { Reveal } from "../ui/Reveal";

const stats = [
  { value: "100%", label: "Free forever" },
  { value: "0", label: "Account required" },
  { value: "PDF", label: "One-click export" },
  { value: "ATS", label: "Live score" },
];

const StatsBar = () => {
  return (
    <section className="border-b border-slate-200/80 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map(({ value, label }, index) => (
          <Reveal key={label} delay={index * 60} direction="fade">
            <div
              className={`px-4 py-8 text-center sm:px-6 ${
                index > 0
                  ? "md:border-l md:border-slate-200/80 dark:md:border-slate-800"
                  : ""
              } ${index % 2 === 1 ? "border-l border-slate-200/80 dark:border-slate-800 md:border-l" : ""}`}
            >
              <p className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
