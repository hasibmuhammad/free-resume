import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gradient dark:bg-mesh-gradient-dark" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-xl text-center lg:text-left">
          <span className="badge mb-4">Free · No sign-up required</span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.25rem]">
            Build a resume that{" "}
            <span className="text-gradient">gets you hired</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            A free online resume builder with live preview and ATS scoring. Fill in
            your details, see changes instantly, and download a professional PDF
            when you&apos;re ready.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/create-resume" className="btn-primary w-full sm:w-auto">
              Start building
              <span aria-hidden>→</span>
            </Link>
            <Link href="/create-resume" className="btn-secondary w-full sm:w-auto">
              View live preview
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
            Trusted by students, engineers, and educators worldwide
          </p>
        </div>

        <div className="relative w-full max-w-md lg:max-w-lg">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand-400/25 via-violet-400/15 to-brand-600/10 blur-3xl" />
          <div className="card-surface relative overflow-hidden shadow-elevated ring-1 ring-brand-100/50 dark:ring-brand-500/20">
            <div className="panel-header !px-4 !py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <div className="preview-paper space-y-4 p-6">
              <div>
                <div className="h-5 w-40 rounded bg-slate-900" />
                <div className="mt-2 h-3 w-28 rounded bg-slate-300" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-slate-100" />
                <div className="h-2 w-5/6 rounded bg-slate-100" />
                <div className="h-2 w-4/6 rounded bg-slate-100" />
              </div>
              <div>
                <div className="mb-2 h-2.5 w-24 rounded-full bg-gradient-to-r from-brand-300 to-brand-500" />
                <div className="space-y-1.5 pl-3">
                  <div className="h-2 w-full rounded bg-slate-100" />
                  <div className="h-2 w-11/12 rounded bg-slate-100" />
                  <div className="h-2 w-10/12 rounded bg-slate-100" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["React", "TypeScript", "Node.js"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md px-2 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-brand-200/50 [background:linear-gradient(135deg,rgb(238_242_255),rgb(224_231_255))]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
