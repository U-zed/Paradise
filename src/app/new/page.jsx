"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const upcomingServices = [
  {
    title: "Nail Art & Care",
    desc: "From gel and acrylic sets to 3D designs, your nails get the premium treatment.",
    img: "/images/set.jpg",
  },
  {
    title: "Upcoming: Lash Extensions",
    desc: "Classic, hybrid, volume, and mega-volume lashes to make your eyes pop.",
    img: "/images/hybrid.jpg",
  },
  {
    title: "Upcoming: Makeup Artistry",
    desc: "Soft glam to bold statement looks, many more beauty services are on the way!",
    img: "/images/mak.jpg",
  },
  {
    title: "Upcoming: Hair Styling",
    desc: "Elegant updos, waves, and precision cuts, stay tuned for our hair services!",
    img: "/images/ins.jpg",
  },
  {
    title: "Upcoming: Spa & Relaxation",
    desc: "Signature massages and aromatherapy to help you unwind, launching soon.",
    img: "/images/mas.jpg",
  },
];

export default function UpcomingServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-white to-blue-400">
      {/* Header Section */}
    <section className="text-center py-14 px-6">
  <motion.h1
    className="text-center text-3xl md:text-4xl font-bold text-pink-700 tracking-widest pb-3 "
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    New & Upcoming Services
  </motion.h1>
  <motion.p
    className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
  >
    Discover our latest nail services and get ready for something new! From stunning nails to our upcoming lash hair and spa treatments, explore the ways we help you shine. Stay tuned for more luxurious experiences coming soon!
  </motion.p>
</section>

      {/* Services Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 pb-20">
        {upcomingServices.map((service, i) => (
          <motion.div
            key={service.title}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex items-start space-x-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Small Image Icon */}
            <div className="flex-shrink-0">
              <Image
                src={service.img}
                alt={service.title}
                width={70}
                height={70}
                className="rounded-full object-cover border border-pink-100"
              />
            </div>
            {/* Text */}
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 pb-1">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base md:text-base text-gray-600">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <motion.div
        className="text-center pb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-orange-700">
          Excited for more?
        </h2>
        <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-base">
          Book your nails appointment at{" "}
          <span className="font-semibold text-orange-700">AusNail</span> today.
        </p>
        <motion.a
          href="/book"
          whileHover={{ scale: 1.05 }}
          className="inline-block mt-6 bg-orange-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-orange-700 transition"
        >
          Book Now
        </motion.a>
      </motion.div>
    </div>
  );
}
