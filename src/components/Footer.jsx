"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white py-10 md:py-14 overflow-hidden">
      {/* Decorative Glow */}
      <motion.div
        className="absolute inset-0 bg-pink-500/20 blur-3xl -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        {/* LOGO */}
      <Link href="/">
        <Image
                src="/images/logo2.jpg"
          alt="AusNail Logo"
          width={60}
          height={60}
          className="object-contain rounded-full mb-5"
          priority
        />
      </Link>
          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-pink-100">
            Empowering confidence through beauty. Discover the art of self-expression with Eve, your everyday glow companion.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h4 className="text-lg sm:text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-pink-100">
            <li>
              <Link href="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">About Us</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">Check Out Our Products</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition">Check Out Our Gallery</Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-white transition">Book Appointment With Us</Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h4 className="text-lg sm:text-xl font-semibold mb-4">Get in Touch</h4>
          <ul className="text-xs sm:text-sm space-y-1 text-pink-100">
            <li>📍 Opp Woman Boku Junction Kubwa Village Market, FCT</li>
            <li>📞 +234 903 111 8322</li>
            {/* <li>📧 evecollections@gmail.com</li> */}
               <li>
              Give us a follow on{" "}
              <a
                href="https://www.tiktok.com/@ausnail"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-semibold hover:underline"
              >
                Tiktok
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
          {/*             <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10H7V7zm8 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.9c1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.3V12H16l-.5 3h-2v7A10 10 0 0022 12z"/>
              </svg>
            </motion.a> */}

            <motion.a
              href="https://www.tiktok.com/@ausnail"
                target="_blank"
                rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="bg-white p-2 rounded-full hover:bg-white/10 transition text-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c.9 0 1.8 0 2.7.1a6.6 6.6 0 004.2 4A7.8 7.8 0 0120 6v3a9.4 9.4 0 01-4.1-1V17a5.9 5.9 0 11-5.9-5.9V15a2.3 2.3 0 102.3 2.3V2z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="text-center text-[10px] sm:text-sm mt-10 border-t border-white/20 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        © {new Date().getFullYear()} AusNail. All rights reserved.
      </motion.div>
    </footer>
  );
}
