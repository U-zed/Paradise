"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Nails",
    "Lashes",
    "Hairs",
    "Tattoos",
    "Jewelry",
    "Beauty Accessories",
  ];

  /* FETCH */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "gallery"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(data);
    });

    return () => unsub();
  }, []);

  /* FIXED FILTER (case-insensitive) */
  const filtered = useMemo(() => {
    if (filter === "All") return images;

    return images.filter((img) =>
      (img.category || "").toLowerCase() === filter.toLowerCase()
    );
  }, [images, filter]);

  return (
    <div className="min-h-screen bg-white px-4 py-10 pt-20">

      {/* HEADER */}
      <h1 className="text-center text-3xl md:text-4xl font-bold text-red-700">
        Paradise Gallery
      </h1>

      <p className="text-center text-sm text-gray-500 mt-2 mb-6">
        Where Beauty Comes to Life ✨
      </p>

      {/* 🔥 STICKY FILTER BAR */}
      {/* 🔥 STICKY FILTER BAR (UNDER NAVBAR) */}
<div
  className="sticky z-40 bg-white py-3 border-b mb-6 flex flex-wrap justify-center gap-2"
  style={{ top: "70px" }} // 👈 adjust to your navbar height
>
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setFilter(cat)}
      className={`px-3 py-1 rounded-full text-sm border transition-all ${
        filter === cat
          ? "bg-red-700 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      {cat}
    </button>
  ))}
</div>

      {/* MASONRY GRID */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">

        {filtered.map((img) => (
          <motion.div
            key={img.id}
            className="break-inside-avoid relative rounded-xl overflow-hidden shadow-md bg-white"
          >

            {/* IMAGE */}
            <div className="relative">

              <Image
                src={img.url}
                alt={img.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />

              {/* 🖼 LOGO WATERMARK (KEEPED) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/images/logo.jpg"
                  alt="logo"
                  width={120}
                  height={120}
                  className="opacity-20"
                />
              </div>
            </div>

            {/* DESCRIPTION (KEEPED) */}
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-700">
                {img.title}
              </p>

              <p className="text-[10px] text-gray-400 capitalize">
                {img.category}
              </p>
            </div>

          </motion.div>
        ))}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-sm">
          No images found in this category ✨
        </p>
      )}
    </div>
  );
}