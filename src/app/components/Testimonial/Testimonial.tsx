"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const testimonials = [
  {
    name: "Vivian",
    role: "College Student",
    feedback:
      "Creating a professional resume on freeResume is so smooth and easy! It saves me so much time and headache.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    feedback:
      "I used freeResume during my last job search and landed interviews at top tech companies thanks to the clean templates.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ms. Spiegel",
    role: "Educator",
    feedback:
      "Many students make mistakes on their resumes, but freeResume's live preview is a great help to ensure consistency.",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(124_58_237/0.04),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgb(124_58_237/0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          label="Testimonials"
          title="Loved by job seekers everywhere"
        />

        <div className="mx-auto mt-14 flex max-w-4xl flex-col items-stretch gap-4 md:flex-row md:items-stretch">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              className="flex flex-1"
              delay={index * 100}
              direction="up"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`home-card h-full w-full p-5 text-left transition-all duration-500 ease-out sm:p-6 ${
                  index === activeIndex
                    ? "scale-[1.02] border-2 border-transparent shadow-elevated [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#a5b4fc,#6366f1,#7c3aed)_border-box] dark:[background:linear-gradient(rgb(15_23_42),rgb(15_23_42))_padding-box,linear-gradient(135deg,#a5b4fc,#6366f1,#7c3aed)_border-box]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={`h-11 w-11 rounded-full object-cover ring-2 transition-all duration-300 ${
                      index === activeIndex
                        ? "ring-brand-300"
                        : "ring-brand-100 dark:ring-brand-500/30"
                    }`}
                    width={44}
                    height={44}
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  &ldquo;{testimonial.feedback}&rdquo;
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
