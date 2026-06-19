"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/products" },
    { name: "Book Now", href: "/book" },
    { name: "Start Training", href: "/register" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Staff", href: "/admin" },
  ];

  return (
    <>
      {loading && <Loader />}
      <nav className="fixed w-full top-0 left-0 z-50 bg-white backdrop-blur-md shadow-sm">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/"
              onClick={() => {
                if (pathname !== link.href) {
                  setLoading(true);
                }
              }}

              className="flex items-center">
              <Image
                src="/images/paradise.jpg"
                alt="Paradise"
                width={50}
                height={50}
                className="object-contain rounded-full"
                priority
              />
            </Link>

          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => {
                    if (pathname !== link.href) {
                      setLoading(true);
                    }
                  }}
                  className="text-gray-700 text-sm sm:text-base md:text-lg font-medium hover:text-pink-800 transition "
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-md shadow-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center py-4 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setIsOpen(false);
                      if (pathname !== link.href) {
                        setLoading(true);
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-800 text-base sm:text-lg font-medium hover:text-pink-600 transition"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
