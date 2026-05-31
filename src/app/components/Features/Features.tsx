import {
  HiOutlineArrowDownTray,
  HiOutlineArrowsUpDown,
  HiOutlineCheckBadge,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const features = [
  {
    icon: HiOutlineEye,
    title: "Live preview",
    description:
      "Watch your resume update as you type. Zoom in, scroll through pages, and see exactly what recruiters will get.",
  },
  {
    icon: HiOutlineArrowDownTray,
    title: "One-click PDF export",
    description:
      "Download a polished, print-ready PDF in A4 format — perfect for applications, email attachments, and job portals.",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Smart auto-save",
    description:
      "Your draft saves automatically in your browser. Close the tab, come back later, and pick up right where you left off.",
  },
  {
    icon: HiOutlineArrowsUpDown,
    title: "Flexible sections",
    description:
      "Reorder sections, show or hide what you need, and tailor the layout for each role without starting over.",
  },
  {
    icon: HiOutlineCheckBadge,
    title: "Live PDF parser",
    description:
      "Your exported PDF is parsed in real time with the OpenResume algorithm — the same text-extraction pipeline used to test ATS readability.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Private by default",
    description:
      "No account required. Your resume stays on your device until you choose to download it.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.04),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Features"
          title="Everything you need to build faster"
          description="A focused editor with the tools that matter — no clutter, no paywalls, no learning curve."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} className="h-full" delay={index * 75} direction="up">
              <div className="home-card group h-full p-6 sm:p-7">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl text-lg text-white shadow-glow transition-transform duration-300 group-hover:scale-105 [background:linear-gradient(135deg,#818cf8_0%,#6366f1_50%,#4338ca_100%)]">
                  <Icon aria-hidden />
                </span>
                <h3 className="relative z-10 mt-5 text-base font-semibold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
