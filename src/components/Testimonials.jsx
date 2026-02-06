"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
const testimonials = [
  {
    name: "Amara Okeke",
    review:
      "Aus-Nail completely transformed my nails! The attention to detail is amazing, and my nails looked flawless for weeks.",
    image: "/images/test1.jpeg",
  },
  {
    name: "Zainab Bello",
    review:
      "I’m obsessed with my nails every single time. The designs are beautiful, neat, and exactly what I ask for.",
    image: "/images/test3.jpeg",
  },
  {
    name: "Blessing Adeyemi",
    review:
      "From booking to finish, the experience was seamless. The nail technicians are professional, gentle, and very skilled.",
    image: "/images/test2.jpeg",
  },
  {
    name: "Halima Sadiq",
    review:
      "Every visit feels relaxing, and the results are always stunning. Aus-Nail never disappoints when it comes to nails.",
    image: "/images/test4.jpeg",
  },
  {
    name: "Kemi Balogun",
    review:
      "Aus-Nail gave me the confidence I needed. My nails always come out neat, stylish, and long-lasting.",
    image: "/images/test5.jpeg",
  },
];

  const [current, setCurrent] = useState(0);

  // Auto carousel: change slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative max-w-5xl mx-auto pt-9 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-700 mb-5">
        What Our Clients Say
      </h2>

      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg"
          >
            <Image
              src={testimonials[current].image}
              alt={testimonials[current].name}
              width={100}
              height={100}
              className="rounded-full object-cover mb-5"
            />
            <p className="text-gray-700 italic mb-4 max-w-xl sm:max-w-2xl text-sm sm:text-base md:text-lg">
              "{testimonials[current].review}"
            </p>
            <h4 className="font-semibold text-blue-700 text-sm sm:text-base md:text-lg">
              {testimonials[current].name}
            </h4>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 flex justify-between items-center md:px-16 w-full">
          <button
            onClick={prev}
            className="bg-pink-100 hover:bg-pink-200 text-pink-600 p-1 rounded-full shadow-md transition-all"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="bg-pink-100 hover:bg-pink-200 text-pink-600 p-1 rounded-full shadow-md transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 md:h-3 md:w-3 rounded-full ${
              i === current ? "bg-pink-600" : "bg-pink-300"
            }`}
            animate={{
              scale: i === current ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  );
}
