import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label="freeResume home"
        >
          <span className="logo-mark shrink-0">f</span>
          <span className="hidden truncate text-base font-bold tracking-tight text-slate-900 min-[380px]:inline sm:text-lg dark:text-white">
            free<span className="text-gradient">Resume</span>
          </span>
        </Link>

        <nav
          className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3"
          aria-label="Main"
        >
          <Link href="/templates" className="nav-link hidden sm:inline-flex">
            Templates
          </Link>
          <Link href="/resume-checker" className="nav-link hidden md:inline-flex">
            Resume checker
          </Link>
          <Link href="/#features" className="nav-link hidden lg:inline-flex">
            Features
          </Link>
          <ThemeToggle />
          <Link
            href="/create-resume"
            className="btn-primary shrink-0 whitespace-nowrap !px-3 !py-2 text-xs sm:!px-4 sm:text-sm"
          >
            <span className="min-[420px]:hidden">Create</span>
            <span className="hidden min-[420px]:inline">Create resume</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
