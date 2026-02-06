"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function GalleryPage() {
  const [filter, setFilter] = useState("Nails");
  const [modalImg, setModalImg] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const galleryRef = useRef(null);

  /* 🔒 Disable background scroll when modal is open */
  useEffect(() => {
    if (modalImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImg]);

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

  const filteredImages =
    filter === "Nails" ? images : images.filter((img) => img.category === filter);

  const visibleImages = filteredImages.slice(0, visibleCount);

  const handleToggleView = () => {
    if (showAll) {
      setVisibleCount(12);
      galleryRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setVisibleCount(filteredImages.length);
    }
    setShowAll(!showAll);
  };

  return (
    <div ref={galleryRef} className="min-h-screen bg-white px-4 py-7  relative">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-pink-700 tracking-widest pb-6">
        Our Gallery
      </h1>

      <p className="text-center text-sm md:text-base text-gray-500 pb-10">
        A showcase of beauty, precision, and timeless glam.
        At AusNail, we offer luxurious nail services and products designed to make your hands
        and feet look flawless. From stunning manicures and pedicures to elegant nail designs,
        every detail is crafted to bring out your confidence and style.
      </p>

      {/* FILTER */}
      {/* <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["Nails", "Lashes", "Hairs"].map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full font-semibold text-sm ${filter === cat
              ? "bg-purple-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-200"
              }`}
            onClick={() => {
              setFilter(cat);
              setVisibleCount(12);
              setShowAll(false);
            }}
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* GRID */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 relative z-30">
        <AnimatePresence>
          {visibleImages.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => setModalImg(img)}
            >
              <Image
                src={img.url}
                alt="Gallery Image"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />

              {img.title && (
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs font-semibold p-1 text-center">
                  {img.title}
                </div>
              )}
            </motion.div>

          ))}
        </AnimatePresence>

        {visibleImages.length === 0 && (
          <p className="col-span-full text-center text-gray-500 text-sm mt-4">
            No images available in this category yet.
          </p>
        )}
      </div>

      {/* VIEW MORE / LESS */}
      {filteredImages.length > 12 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-6 flex justify-center z-40"
        >
          <button
            onClick={handleToggleView}
            className="px-5 py-2 bg-blue-900 text-white rounded-xl font-semibold text-sm shadow-lg"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </motion.div>
      )}

      {/* MODAL */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 cursor-pointer"
          onClick={() => setModalImg(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-3xl w-full"
          >
            <PreviewImage modalImg={modalImg} />
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------
   PREVIEW IMAGE (TITLE + WATERMARK)
------------------------------------ */
function PreviewImage({ modalImg }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {/* IMAGE */}
      <Image
        src={modalImg.url}
        alt="Preview"
        className="rounded-xl object-contain w-full max-h-[90vh]"
        width={0}
        height={0}
        sizes="100vw"
        onLoad={() => setLoaded(true)}
        priority
      />

      {/* WATERMARK (after image loads) */}
      {loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/logo.jpg"
            alt="AusNail"
            width={300}
            height={300}
            className="object-contain opacity-30 "
            priority
          />
        </div>
      )}

      {/* TITLE */}
      {modalImg.title && (
        <div className="absolute top-0 left-1/2 mt-3 text-center text-white text-sm font-semibold tracking-wide">
          {modalImg.title}
        </div>
      )}
    </div>
  );
}
