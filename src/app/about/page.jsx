"use client";

import { motion } from "framer-motion";
// import Image from "next/image";
import { Sparkles, Heart, Star, ShieldCheck } from "lucide-react";
import CEOCard from "@/components/CEOCard";

export default function About() {
  return (
    <main className="overflow-hidden ">
      {/* ABOUT AusNailSECTION */}
      <section className="relative min-h-screen bg-gradient-to-b from-pink-100 to-white pt-12 py-8 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left side: Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden py-9 md:py-5">
              <CEOCard/>

              {/* <Image
                src="/images/logo.png"
                alt="AusNail"
                width={400}
                height={400}
                className="object-cover w-full h-[420px]"
                priority
              /> */}
            </div>
          </motion.div>

          {/* Right side: Text */}
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
              About Us
            </motion.h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
  Welcome to <span className="font-semibold text-orange-700">AusNail</span>, where beauty meets confidence. At AusNail, we believe every woman deserves to feel radiant, empowered, and effortlessly elegant—starting with flawless nails.
</p>

<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
  Our story began with a passion for creating stunning nails that enhance your natural beauty. From expertly crafted manicures and pedicures to intricate designs and luxurious nail treatments, we celebrate individuality and style in every detail.
</p>

<p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
  Whether it’s a quick polish refresh or a full nail transformation, <span className="font-semibold text-orange-700">AusNail</span> is here to make your nails look flawless and help you feel your most confident, beautiful self.
</p>

            <motion.button
              className="mt-5 bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-800 transition-all shadow-lg text-sm sm:text-base md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Services
            </motion.button>
          </motion.div>
        </div>

        {/* Floating background effects */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-40"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-white py-9 px-6 md:px-16">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-blue-900 mb-10">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-10 h-10 text-orange-700" />,
                title: "Premium Quality",
                text: "We use only the finest, skin-loving ingredients and luxury beauty products.",
              },
              {
                icon: <Heart className="w-10 h-10 text-orange-700" />,
                title: "Personalized Care",
                text: "Every treatment is tailored uniquely to highlight your natural beauty.",
              },
              {
                icon: <Star className="w-10 h-10 text-orange-700" />,
                title: "Expert Stylists",
                text: "Our passionate and skilled professionals bring out your most confident self.",
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-orange-700" />,
                title: "Trusted by Many",
                text: "Thousands of satisfied clients trust AusNail for their beauty and wellness needs.",
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
                <div className="flex flex-col items-center mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl md:text-xl font-semibold text-blue-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-base text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
