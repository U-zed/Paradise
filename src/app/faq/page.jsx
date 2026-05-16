"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Paradise offer?",
      answer:
        "Paradise is a full luxury beauty studio offering nails, tattoos, microblading, wig installation, lash services, and custom beauty transformations designed to enhance your natural glow.",
    },
    {
      question: "Are you adding more beauty services in the future?",
      answer:
        "Yes! Paradise is constantly growing. We are currently expanding into luxury beauty accessories and jewelry, along with new beauty treatments.",
    },
    {
      question: "How do I book an appointment at Paradise?",
      answer:
        "Just visit our 'Book Now' page, choose your service, and pick a time that works best for you.",
    },
    {
      question: "Are your services safe and high quality?",
      answer:
        "Absolutely. We prioritize hygiene, safety, and premium-quality products in every service we offer.",
    },
  ];

  return (
    <main className="min-h-screen bg-orange-50 pt-11 px-4">
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-pink-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-orange-700 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-pink-200 rounded-xl overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-4 md:p-5 bg-pink-100/40 text-left"
              >
                <span className="font-semibold text-orange-700 text-sm sm:text-base md:text-lg">
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-orange-700" />
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 md:px-5 pb-4 text-gray-700 text-sm sm:text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}