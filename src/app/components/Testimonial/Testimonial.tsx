"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    <section className="border-t border-slate-200/80 bg-white px-4 py-16 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="section-label">Testimonials</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Loved by job seekers everywhere
        </h2>
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-stretch gap-4 md:flex-row md:items-center">
        {testimonials.map((testimonial, index) => (
          <button
            type="button"
            onClick={() => setActiveIndex(index)}
            key={testimonial.name}
            className={`card-surface flex-1 p-5 text-left transition-all duration-300 ${
              index === activeIndex
                ? "scale-[1.02] border-2 border-transparent shadow-elevated [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#a5b4fc,#6366f1,#7c3aed)_border-box] dark:[background:linear-gradient(rgb(15_23_42),rgb(15_23_42))_padding-box,linear-gradient(135deg,#a5b4fc,#6366f1,#7c3aed)_border-box]"
                : "opacity-60 hover:opacity-90 hover:shadow-card"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-100"
                width={44}
                height={44}
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              &ldquo;{testimonial.feedback}&rdquo;
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
