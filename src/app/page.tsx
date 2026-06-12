import AtsHighlight from "./components/AtsHighlight/AtsHighlight";
import FAQ from "./components/FAQ/FAQ";
import Features from "./components/Features/Features";
import Hero from "./components/Hero/Hero";
import ResumeSections from "./components/ResumeSections/ResumeSections";
import StatsBar from "./components/StatsBar/StatsBar";
import Steps from "./components/Steps/Steps";
import Templates from "./components/Templates/Templates";
import Testimonials from "./components/Testimonial/Testimonial";
import { JsonLd } from "./components/seo/JsonLd";
import { Reveal } from "./components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: "Free ATS-Friendly Resume Builder Online",
  description:
    "Create a professional resume for free with live preview, PDF download, and real-time ATS parse-rate scoring. No account required — start building in seconds.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd includeFaq />
      <div className="page-bg">
      <Hero />
      <StatsBar />
      <Steps />
      <Templates />
      <Features />
      <AtsHighlight />
      <ResumeSections />
      <Testimonials />
      <FAQ />

      <section className="saas-section !pb-20">
        <Reveal direction="up">
          <div className="cta-banner">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to land your next role?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Start building your professional resume today — free, fast, and
              designed for the modern job market.
            </p>
            <Link href="/create-resume" className="btn-light mt-7">
              Get started free
            </Link>
          </div>
        </Reveal>
      </section>
      </div>
    </>
  );
}
