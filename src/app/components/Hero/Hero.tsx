import Link from "next/link";
import { HiOutlineCheck } from "react-icons/hi2";
import { ResumeShowcase } from "../Preview/ResumeShowcase";

const trustItems = [
  "Live preview",
  "PDF export",
  "ATS scoring",
  "No account required",
];

const Hero = () => {
  return (
    <section className="border-b border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-20">
        <div className="max-w-xl text-center lg:text-left">
          <span className="badge mb-5">Free resume builder</span>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Build a resume that{" "}
            <span className="text-gradient">gets you hired</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Professional templates, real-time preview, and ATS scoring — everything
            you need to create a job-ready resume in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/create-resume" className="btn-primary w-full sm:w-auto">
              Start building — it&apos;s free
            </Link>
            <Link href="/#features" className="btn-secondary w-full sm:w-auto">
              See features
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
            {trustItems.map((item) => (
              <li key={item} className="trust-pill">
                <HiOutlineCheck
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-sm shrink-0 lg:max-w-md">
          <div className="product-frame">
            <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Resume preview
            </p>
            <ResumeShowcase templateId="modern-split" variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
