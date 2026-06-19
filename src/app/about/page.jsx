"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Star, ShieldCheck } from "lucide-react";
import CEOCard from "@/components/CEOCard";
import { useState } from "react";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function About() {
    const [loading, setLoading] = useState(false);

  return (
    <main className="overflow-hidden">
      {loading && <Loader />}

      {/* ABOUT PARADISE SECTION */}
      <section className="relative min-h-screen bg-gradient-to-b from-pink-100 to-white pt-12 py-8 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

          {/* Left side */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden py-9 md:py-5">
              <CEOCard />
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-800 mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              About Paradise
            </motion.h2>

           <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
  Welcome to <span className="font-semibold text-orange-700">Paradise</span>,
  where beauty lives and confidence is created. We are a full luxury beauty studio dedicated to helping you look and feel your absolute best through a wide range of professional services.
</p>

<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
  At Paradise, we specialize in flawless nails, custom tattoos, microblading, wig installation, and lash enhancements, all delivered with precision, creativity, and care. Every service is designed to enhance your natural beauty and reflect your unique style.
</p>

<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
  Soon, we’ll also be expanding into luxury beauty accessories and jewelry, giving you everything you need to complete your glow-up in one place. At <span className="font-semibold text-orange-700">Paradise</span>, beauty is not just a service, it’s an experience.
</p>

            <motion.div whileHover={{ scale: 1.05 }}>
  <Link
    href="/products"
    onClick={() => setLoading(true)}
    className="mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-800 transition-all shadow-lg"
  >
    Explore Our Services
  </Link>
</motion.div>
          </motion.div>
        </div>

        {/* Floating effects */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-30"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-40"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-9 px-6 md:px-16">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-900 mb-10">
            Why Choose Paradise?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-10 h-10 text-orange-700" />,
                title: "Luxury Quality",
                text: "Premium products and flawless finishes designed for long-lasting beauty.",
              },
              {
                icon: <Heart className="w-10 h-10 text-orange-700" />,
                title: "Personal Care",
                text: "Every service is tailored to match your unique style and personality.",
              },
              {
                icon: <Star className="w-10 h-10 text-orange-700" />,
                title: "Skilled Artists",
                text: "Expert nail technicians dedicated to perfection in every detail.",
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-orange-700" />,
                title: "Trusted Beauty Spot",
                text: "A growing community of clients who trust Paradise for their glow-up.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 hover:shadow-xl transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}