"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      alert("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-red-50 items-center pt-10">
      <div>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-900 pb-3 pt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Get in Touch with Paradise
        </motion.h2>

        <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-8 px-5">
          We’d love to hear from you. Whether you’re booking a beauty service, asking a question,
          or exploring our upcoming accessories and jewelry collection — the Paradise team is here for you.
        </p>
      </div>

      <section className="grid md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-12">

        {/* Left Section, Contact Form */}
        <div className="flex justify-center">

          <motion.div
            className="relative z-10 w-full max-w-lg bg-white/90 rounded-2xl shadow-2xl border border-pink-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className=" p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-4 text-sm sm:text-base md:text-base">


              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-pink-200 rounded-md text-black px-4 py-2 text-sm sm:text-base md:text-base focus:outline-none  focus:ring-1 focus:ring-pink-400 transition"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-pink-200 rounded-md px-4 py-2 text-sm sm:text-base md:text-base focus:outline-none text-black focus:ring-1 focus:ring-pink-400 transition"
                required

              />
              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-pink-200 rounded-md px-4 py-2 text-sm sm:text-base md:text-base focus:outline-none focus:ring-1 text-black focus:ring-pink-400 transition resize-none"
                rows={4}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 text-sm sm:text-base md:text-base rounded-xl font-semibold hover:bg-blue-950 transition-all duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Section, Call to Action */}
        <div className="mx-auto">
          {/* Contact Info */}
          <motion.div
            className="text-left my-10 grid md:grid-cols-2 text-gray-700 text-sm sm:text-base md:text-base"
          >
            <p>📍 Beside Musa Diko House, Jaji Street, Kubwa Village Market, FCT</p>
            <p>📞 +234 903 111 8322</p>

            <p>
              Follow us on{" "}
              <a
                href="https://www.tiktok.com/@Paradise.wbl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 font-semibold hover:underline"
              >
                TikTok
              </a>
            </p>
          </motion.div>


          <motion.div
            className="bg-gradient-to-br from-orange-600 to-blue-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center p-6 md:p-12 h-fit"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Your Glow-Up Starts at Paradise
            </h2>

            <p className="mb-6 text-pink-100 text-sm sm:text-base md:text-base max-w-md">
              Book your appointment today for nails, tattoos, microblading, wigs, lashes,
              and luxury beauty transformations or explore our upcoming beauty collections.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/book"
                className="bg-white text-blue-900 font-semibold px-6 py-3 text-sm sm:text-base md:text-base rounded-full hover:bg-pink-100 transition"
              >
                Book Now
              </Link>
              <Link
                href="/register"
                className="bg-red-800 text-white px-6 py-3 rounded-full shadow-md
  hover:bg-white hover:text-red-700 border border-red-700 transition-all text-sm sm:text-base"
              >
                 Training With Us
              </Link>
              <Link
                href="/products"
                className="border border-white text-white px-6 py-3 text-sm sm:text-base md:text-base rounded-full hover:bg-white hover:text-blue-900 transition"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
