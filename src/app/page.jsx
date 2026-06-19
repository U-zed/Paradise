"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import UpcomingServicesPage from "./new/page";
import ProductsPage from "./products/page";
import Contact from "./contact/page";
import FAQ from "./faq/page";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import About from "./about/page";
import JustProducts from "@/components/JustProducts";
import { useState } from "react";
import Loader from "@/components/Loader";


export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="text-center pt-28 bg-orange-50 min-h-screen">

    <>
      {loading && <Loader />}
      {/* Hero Section */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pb-20 px-5"
      >
        <h1 className="  text-4xl sm:text-5xl md:text-6xl font-bold text-blue-950 mb-1">
          Welcome to <b className="text-red-700 font-mono">Paradise</b>
        </h1>
        <p className="text-base font-bold p-3 font-mono text-red-700 mb-4">Where Beauty Lives!</p>
        <p className="mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-800">
          Step into Paradise, your luxury destination for flawless nail care and beauty.
          From elegant manicures to premium nail essentials, we create looks that leave a lasting impression.
          Book your appointment today and let your beauty shine effortlessly.
        </p>
        {/* Promo Banner */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.05, 1, 1.05, 1], // subtle breathing effect
          }}
          transition={{
            duration: 4,   // total duration of one breathing cycle
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-center bg-red-700 text-white px-4 py-3 rounded-full shadow-md mt-5 inline-block"
        >
          <p>🎉 Grand Opening Promo 🎉</p>
          <p className="text-sm"> Celebrate our grand opening with 5 days of beauty deals. Get semi-permanent tattoos/micro blading from just 10k, gel polish from 3k, and acrylic nails from 5k!
          </p>
        </motion.div> */}


      <motion.div className="mt-8 px-7 flex flex-col sm:flex-row justify-center gap-4">
  <Link
    href="/products"
    onClick={() => setLoading(true)}
    className="bg-blue-950 text-white px-6 py-3 rounded-full shadow-md
    hover:bg-white hover:text-blue-950 border border-blue-950 transition-all text-sm sm:text-base md:text-base"
  >
    Products & Services
  </Link>

  <Link
    href="/book"
    onClick={() => setLoading(true)}
    className="border border-blue-950 text-blue-950 px-6 py-3 rounded-full hover:bg-blue-950 hover:text-white transition text-sm sm:text-base md:text-base"
  >
    Book Appointment
  </Link>

  <Link
    href="/register"
    onClick={() => setLoading(true)}
    className="bg-red-800 text-white px-6 py-3 rounded-full shadow-md
    hover:bg-white hover:text-red-700 border border-red-700 transition-all text-sm sm:text-base"
  >
    Start Training
  </Link>
</motion.div>
      </motion.section>

         </>
      {/* Products */}
      <section id="services">
        <JustProducts />
      </section>

      {/* Upcoming Services */}
      <section id="services">
        <UpcomingServicesPage />
      </section>

      {/* About Us */}
      <section id="about">
        <About />
      </section>

      {/* Stats */}
      <section id="stats">
        <Stats />
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Contact us */}
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
