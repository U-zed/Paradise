"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const stats = [
    { number: 200, suffix: "+", label: "Happy Clients" },
    { number: 50, suffix: "+", label: "Beauty Products" },
    { number: 20, suffix: "+", label: "Skilled Stylists" },
    { number: 5, suffix: "", label: "Years of Excellence" },
  ];

  return (
    <main className="h-fit bg-white pt-8 px-6">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text34xl md:text-4xl font-bold text-orange-700 mb-10">
        AusNail in Numbers
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              number={item.number}
              suffix={item.suffix}
              label={item.label}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </main>
  );
}

function StatCard({ number, suffix, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = number / (duration / 16); // ~60fps
    let frame;

    const animate = () => {
      start += increment;
      if (start < number) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(number);
        cancelAnimationFrame(frame);
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      className="bg-pink-100 border border-pink-200 rounded-2xl shadow-md py-8 sm:py-10 px-4 mb-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2 }}
    >
      <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-orange-700">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mt-2">{label}</p>
    </motion.div>
  );
}
