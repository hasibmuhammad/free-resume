import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <Reveal direction="up">
      <div className={isCenter ? "text-center" : "text-left"}>
        <p className="section-label">{label}</p>
        <h2
          className={`mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 ${
              isCenter ? "mx-auto max-w-2xl" : "max-w-lg"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
