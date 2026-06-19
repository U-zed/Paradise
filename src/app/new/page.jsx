"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loader from "@/components/Loader";

const upcomingServices = [
  {
    title: "Signature Nail Art & Care",
    desc: "Luxury gel, acrylic sets, custom designs, and flawless finishes tailored to your style at Paradise.",
    img: "/images/set.jpg",
  },
  {
    title: "Luxury Lash Extensions (Coming Soon)",
    desc: "Classic, hybrid, volume, and mega-volume lashes designed to enhance your natural beauty effortlessly.",
    img: "/images/hybrid.jpg",
  },
  {
    title: "Makeup Artistry (Coming Soon)",
    desc: "Soft glam, bridal glow, and bold statement looks, crafted to elevate your confidence for every occasion.",
    img: "/images/mak.jpg",
  },
  {
    title: "Hair Styling Studio (Coming Soon)",
    desc: "Elegant styles, sleek finishes, waves, and creative looks designed to match your personality.",
    img: "/images/ins.jpg",
  },
  {
    title: "Spa & Relaxation Experience (Coming Soon)",
    desc: "Relax, refresh, and recharge with signature treatments designed to restore your natural glow.",
    img: "/images/mas.jpg",
  },
];

export default function UpcomingServicesPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-pink-50">
      <>
        {loading && <Loader />}
        {/* HEADER */}
        <section className="text-center p-6">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-red-700 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Paradise Experience
          </motion.h1>

          <motion.p
            className="mt-4 text-gray-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            At <span className="text-red-700 font-semibold">Paradise</span>, beauty is more than a service,
            it’s an experience. Explore our signature nail care and discover what’s coming next in our world of luxury beauty.
          </motion.p>
        </section>

        {/* SERVICES GRID */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 pb-20">

          {upcomingServices.map((service, i) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex items-center gap-4 border border-pink-50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >

              {/* IMAGE */}
              <div className="flex-shrink-0">
                <Image
                  src={service.img}
                  alt={service.title}
                  width={75}
                  height={75}
                  className="rounded-full object-cover border-2 border-pink-100"
                />
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {service.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </section>

        {/* CALL TO ACTION */}
        <motion.div
          className="text-center pb-16 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-red-700">
            Ready for your glow-up?
          </h2>

          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Book your appointment today and experience luxury at <span className="font-semibold text-red-700">Paradise</span>.
          </p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/book"
              onClick={() => setLoading(true)}
              className="inline-block mt-6 bg-red-700 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-800 transition"
            >
              Book Your Experience
            </Link>
          </motion.div>
        </motion.div>
      </>
    </div>
  );
}