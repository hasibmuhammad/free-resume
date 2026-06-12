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
    <section className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="saas-section">
        <SectionHeader
          label="Testimonials"
          title="Loved by job seekers everywhere"
        />

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-stretch gap-3 md:flex-row">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              className="flex flex-1"
              delay={index * 80}
              direction="up"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`saas-panel h-full w-full p-5 text-left transition-all duration-300 sm:p-6 ${
                  index === activeIndex
                    ? "border-brand-300 ring-1 ring-brand-200 dark:border-brand-500/50 dark:ring-brand-500/20"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
