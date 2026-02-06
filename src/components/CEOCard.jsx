"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CEOCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative max-w-sm mx-auto mt-5"
    >
      {/* Glow background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 rounded-3xl blur-xl opacity-90"></div>

      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-pink-100">
        {/* Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
          <Sparkles size={14} />
          Founder Spotlight
        </div>

        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center"
        >
          <Image
            src="/images/ceo.jpg"
            alt="AusNail CEO"
            width={170}
            height={170}
            className="rounded-full object-cover shadow-xl ring-3 ring-orange-600"
          />
        </motion.div>

        {/* Text */}
        <div className="text-center pt-6">
          <h3 className="font-bold text-base text-blue-900 tracking-wide">
            Edeh Austine
          </h3>

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widet pt-1">
            Founder & CEO
          </p>

          <p className="pt-3 text-sm text-gray-800 leading-relaxed italic">
            “Luxury beauty isn’t just how you look, it’s how confident you feel when you walk out.”
          </p>
        </div>
      </div>
    </motion.div>
  );
}
