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
    <section id="features" className="saas-section">
      <SectionHeader
        label="Features"
        title="Everything you need to build faster"
        description="A focused editor with the tools that matter — no clutter, no paywalls, no learning curve."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }, index) => (
          <Reveal key={title} className="h-full" delay={index * 60} direction="up">
            <div className="home-card h-full p-5 sm:p-6">
              <span className="feature-icon">
                <Icon aria-hidden />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Features;
