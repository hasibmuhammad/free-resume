import AtsHighlight from "./components/AtsHighlight/AtsHighlight";
import FAQ from "./components/FAQ/FAQ";
import Features from "./components/Features/Features";
import Hero from "./components/Hero/Hero";
import ResumeSections from "./components/ResumeSections/ResumeSections";
import StatsBar from "./components/StatsBar/StatsBar";
import Steps from "./components/Steps/Steps";
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
      <Features />
      <AtsHighlight />
      <ResumeSections />
      <Testimonials />
      <FAQ />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <div className="cta-banner">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.15),transparent_55%)]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl motion-safe:animate-pulse" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-400/15 blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ready to land your next role?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-indigo-100">
                Start building your professional resume today — free, fast, and
                designed for the modern job market.
              </p>
              <Link href="/create-resume" className="btn-light mt-8">
                Get started free
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      </div>
    </>
  );
}
