"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function Footer() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setLoading(false);
}, [pathname]);
  
  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <footer className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
      {loading && <Loader />}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-pink-500/20 blur-3xl -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/">
            <Image
              src="/images/paradise.jpg"
              alt="Paradise Logo"
              width={70}
              height={70}
              className="rounded-full mb-4 bg-white p-1 object-cover"
              priority
            />
          </Link>

          <p className="text-sm text-pink-100 leading-relaxed">
            Paradise is where beauty meets confidence. We create elegant nails,
            luxury beauty experiences, and moments that make you glow inside and out.
          </p>
        </motion.div>

        {/* LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>

          <ul className="space-y-2 text-sm text-pink-100">
            <li><Link href="/" onClick={() => setLoading(true)} className="hover:text-white">Home</Link></li>
            <li><Link href="/book" onClick={() => setLoading(true)} className="hover:text-white">Book Appointment</Link></li>
            <li><Link href="/register" onClick={() => setLoading(true)} className="hover:text-white">Train With Us</Link></li>
            <li><Link href="/about" onClick={() => setLoading(true)} className="hover:text-white">About Paradise</Link></li>
            <li><Link href="/contact" onClick={() => setLoading(true)} className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/products" onClick={() => setLoading(true)} className="hover:text-white">Our Products</Link></li>
            <li><Link href="/gallery" onClick={() => setLoading(true)} className="hover:text-white">Gallery</Link></li>
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold mb-4">Contact Paradise</h4>

          <ul className="text-sm space-y-2 text-pink-100">
            <li>
              📍 No 34 Block 8, Akufor Street A Close, Maitama Sabo, Kubwa FCT Abuja, Abuja
            </li>
            <li>📞 +234 903 111 8322</li>

            <li>
              Follow us on{" "}
              <a
                href="https://www.tiktok.com/@Paradise.wbl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 font-semibold hover:underline"
              >
                TikTok
              </a>
            </li>
          </ul>

          {/* Social */}
          <div className="flex gap-4 mt-5">
            <motion.a
              href="https://www.tiktok.com/@Paradise"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="bg-white p-2 rounded-full text-black hover:bg-pink-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c.9 0 1.8 0 2.7.1a6.6 6.6 0 004.2 4A7.8 7.8 0 0120 6v3a9.4 9.4 0 01-4.1-1V17a5.9 5.9 0 11-5.9-5.9V15a2.3 2.3 0 102.3 2.3V2z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <motion.div
        className="text-center text-xs sm:text-sm mt-10 border-t border-white/10 pt-6 text-pink-100"
      >
        © 2026 Paradise. All rights reserved.
      </motion.div>
    </footer>
  );
}