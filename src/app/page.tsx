import Hero from "./components/Hero/Hero";
import Steps from "./components/Steps/Steps";
import Testimonials from "./components/Testimonial/Testimonial";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page-bg">
      <Hero />
      <Steps />
      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="cta-banner">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.15),transparent_55%)]" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
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
      </section>
    </div>
  );
}
