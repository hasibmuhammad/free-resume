import Link from "next/link";

const LINKEDIN_URL = "https://www.linkedin.com/in/hasibmuhammad";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative shrink-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/90 to-transparent dark:via-slate-700/70"
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="freeResume home"
          >
            <span className="logo-mark !h-6 !w-6 !text-[10px]">f</span>
            <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-white">
              free<span className="text-gradient">Resume</span>
            </span>
          </Link>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link href="/templates" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Resume templates
            </Link>
            <Link href="/create-resume" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Resume builder
            </Link>
            <Link href="/resume-checker" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              ATS resume checker
            </Link>
            <Link href="/#features" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Features
            </Link>
          </nav>

          <p className="max-w-md text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            &copy; {year} freeResume &middot; Built with{" "}
            <span aria-label="love">❤️</span> by{" "}
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700 underline decoration-slate-300/80 underline-offset-[3px] transition-colors hover:text-brand-600 hover:decoration-brand-300 dark:text-slate-200 dark:decoration-slate-600 dark:hover:text-brand-300"
            >
              Md Hasib Talukder
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
