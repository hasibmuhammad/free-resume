import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="logo-mark">f</span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            free<span className="text-gradient">Resume</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/create-resume" className="nav-link hidden sm:inline-flex">
            Features
          </Link>
          <ThemeToggle />
          <Link href="/create-resume" className="btn-primary !px-4 !py-2 text-sm">
            Create resume
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
