import Link from "next/link";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentCheck,
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const atsPlatforms = ["Greenhouse", "Lever", "Workday", "Ashby", "iCIMS"];

const atsPoints = [
  {
    icon: HiOutlineDocumentCheck,
    title: "Selectable PDF text",
    description:
      "Exports use real text — not images — so parsers can read every section, date, and bullet point.",
  },
  {
    icon: HiOutlineMagnifyingGlass,
    title: "Keyword-ready skills",
    description:
      "A dedicated skills section helps your resume match job descriptions during automated scans.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Standard structure",
    description:
      "Conventional headings and clean formatting align with how top ATS platforms extract data.",
  },
];

const sampleChecks = [
  { label: "Full name", status: "pass" },
  { label: "Professional email", status: "pass" },
  { label: "Work experience", status: "pass" },
  { label: "Impact bullet points", status: "warn" },
  { label: "Skills list", status: "pass" },
];

export default function AtsHighlight() {
  return (
    <section
      id="ats"
      className="border-t border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30"
    >
      <div className="saas-section !py-16 lg:!py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeader
              align="left"
              label="ATS ready"
              title="Built to pass applicant tracking systems"
              description="Most companies screen resumes with ATS software before a human sees them. freeResume exports your PDF and runs the OpenResume parser on it live — extracting name, email, sections, and skills the way an ATS would."
            />

            <div className="mt-8 space-y-4">
              {atsPoints.map(({ icon: Icon, title, description }, index) => (
                <Reveal key={title} delay={index * 80} direction="up">
                  <div className="flex gap-3.5">
                    <span className="feature-icon shrink-0">
                      <Icon aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280} direction="up">
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/resume-checker" className="btn-primary inline-flex">
                  Scan your resume free
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/create-resume" className="btn-secondary inline-flex">
                  Build a new one
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal direction="scale">
            <div className="saas-panel mx-auto max-w-md overflow-hidden lg:max-w-none">
              <div className="panel-header flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Live ATS checker
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  87 · Excellent
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                    <svg className="-rotate-90" width="64" height="64" aria-hidden>
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        fill="none"
                        className="stroke-slate-200 dark:stroke-slate-700"
                        strokeWidth="4"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        fill="none"
                        className="stroke-emerald-500"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={163.36}
                        strokeDashoffset={21.24}
                      />
                    </svg>
                    <span className="absolute text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      87
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      ATS compatibility
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                      11 passed · 1 tip · 0 to fix
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {sampleChecks.map(({ label, status }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/50"
                    >
                      <HiOutlineCheckCircle
                        aria-hidden
                        className={`h-4 w-4 shrink-0 ${
                          status === "pass"
                            ? "text-emerald-500"
                            : "text-amber-500"
                        }`}
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Compatible with platforms used by thousands of employers:
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {atsPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
