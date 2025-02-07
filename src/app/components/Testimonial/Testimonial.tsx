"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Vivian",
    role: "College Student",
    feedback:
      "Creating a professional resume on freeResume is so smooth and easy! It saves me so much time and headache to not deal with google doc template.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    feedback:
      "I used freeResume during my last job search and was invited to interview at top tech companies such as Google and Amazon thanks to its well-designed resume templates.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ms. Spiegel",
    role: "Educator",
    feedback:
      "Many students make mistakes on their resumes, but freeResume's auto-format feature is a great help to ensure consistency.",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        What Clients Say
      </h2>

      <div className="relative flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 w-full max-w-4xl px-4">
        {testimonials.map((testimonial, index) => (
          <div
            onClick={() => setActiveIndex(index)}
            key={index}
            className={`cursor-pointer relative w-full md:w-80 p-6 bg-white rounded-2xl shadow-lg transition-all duration-500 border-2 text-center md:text-left ${
              index === activeIndex
                ? "border-black scale-105"
                : "border-transparent opacity-50"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-3">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                width={64}
                height={64}
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
