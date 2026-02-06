"use client";

import { motion } from "framer-motion";

export default function FAQ() {
const faqs = [
  {
    question: "What services does Aus-Nail currently offer?",
    answer:
      "Aus-Nail currently specializes in professional nail services and nail products designed to give you flawless, stylish results. We’re also excited to introduce additional beauty services very soon.",
  },
  {
    question: "Are you adding new services in the future?",
    answer:
      "Yes! While nails are our main focus right now, we’re actively working on expanding into more beauty services, including upcoming lash treatments. Stay tuned for updates!",
  },
  {
    question: "How can I book a nail appointment?",
    answer:
      "Simply visit our 'Book Now' page to choose your preferred nail service and select a time that works best for you.",
  },
  {
    question: "Are your nail products and services safe and cruelty-free?",
    answer:
      "Absolutely! We use high-quality, cruelty-free products and follow safe, hygienic practices to ensure the best experience for our clients.",
  },
];

  return (
    <main className="min-h-screen bg-orange-50 py-14 px-4">
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-pink-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-orange-700 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-pink-100/30 rounded-xl p-4 md:p-5 border border-pink-200 hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-orange-700">
                {faq.question}
              </h3>
              <p className="text-sm sm:text-base md:text-base text-gray-700 mt-2">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
