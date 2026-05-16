"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

export default function JustProducts() {
  const [pressOnProducts, setPressOnProducts] = useState([]);
  const [nailsAndLashesProducts, setNailsAndLashesProducts] = useState([]);
  const [hairAndSkinProducts, setHairAndSkinProducts] = useState([]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const unsubPressOn = onSnapshot(
      collection(db, "presson-products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPressOnProducts(data);
      }
    );

    const unsubNails = onSnapshot(
      collection(db, "nailsandlashes-products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNailsAndLashesProducts(data);
      }
    );

    const unsubHair = onSnapshot(
      collection(db, "hair-skin-products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHairAndSkinProducts(data);
      }
    );

    return () => {
      unsubPressOn();
      unsubNails();
      unsubHair(); // ✅ FIXED (you forgot this)
    };
  }, []);

  /* ---------------- CAROUSEL ---------------- */
  const ProductCarousel = ({ products }) => {
    const x = useMotionValue(0);
    const containerRef = useRef();
    const indexRef = useRef(0);

    const loopItems = [...products, ...products, ...products];
    const [itemWidth, setItemWidth] = useState(0);

    const updateItemWidth = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth;

      if (window.innerWidth >= 1280) setItemWidth(width * 0.19);
      else if (window.innerWidth >= 768) setItemWidth(width * 0.24);
      else setItemWidth(width * 0.49);
    };

    useEffect(() => {
      updateItemWidth();
      window.addEventListener("resize", updateItemWidth);
      return () => window.removeEventListener("resize", updateItemWidth);
    }, []);

    const slideNext = () => {
      indexRef.current += 1;

      animate(x, -itemWidth * (products.length + indexRef.current), {
        type: "spring",
        stiffness: 120,
        damping: 20,
        onComplete: () => {
          if (indexRef.current >= products.length) {
            indexRef.current = 0;
            x.set(-itemWidth * products.length);
          }
        },
      });
    };

    const slidePrev = () => {
      indexRef.current -= 1;

      animate(x, -itemWidth * (products.length + indexRef.current), {
        type: "spring",
        stiffness: 120,
        damping: 20,
        onComplete: () => {
          if (indexRef.current < 0) {
            indexRef.current = products.length - 1;
            x.set(-itemWidth * products.length);
          }
        },
      });
    };

    useEffect(() => {
      const interval = setInterval(slideNext, 3500);
      return () => clearInterval(interval);
    });

    const handleDragEnd = (event, info) => {
      if (!itemWidth) return;

      if (info.offset.x < -itemWidth / 2) slideNext();
      else if (info.offset.x > itemWidth / 2) slidePrev();
      else
        animate(x, -itemWidth * (products.length + indexRef.current), {
          type: "spring",
          stiffness: 120,
          damping: 20,
        });
    };

    return (
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-3 cursor-grab"
          ref={containerRef}
          style={{ x }}
          drag="x"
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {loopItems.map((p, idx) => (
            <motion.div
              key={`${p.id}-${idx}`}
              style={{ width: itemWidth }}
              className="flex-shrink-0 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center hover:shadow-xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative w-full h-52 md:h-60 lg:h-64">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="py-3 text-center px-2">
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  {p.name}
                </h3>

                <p className="text-xs md:text-sm text-gray-500 mb-2">
                  {p.desc}
                </p>

                <p className="font-bold text-sm text-red-700">
                  ₦{Number(p.newPrice).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* NAV BUTTONS */}
        <button
          onClick={slidePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-red-600 hover:text-red-800 px-2 z-10"
        >
          ◀
        </button>

        <button
          onClick={slideNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 text-red-600 hover:text-red-800 px-2 z-10"
        >
          ▶
        </button>
      </div>
    );
  };

  /* ---------------- SECTION WRAPPER ---------------- */
  const ProductSection = ({ title, products, bgFrom, bgTo }) => (
    <section className={`bg-gradient-to-b ${bgFrom} ${bgTo} py-10`}>
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-xl md:text-3xl font-bold text-red-700 mb-6">
          {title}
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            No products available yet.
          </p>
        ) : (
          <ProductCarousel products={products} />
        )}
      </div>
    </section>
  );

  /* ---------------- PAGE ---------------- */
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="text-center py-8 bg-gradient-to-b from-orange-100 to-white">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-red-700 tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Paradise Products
        </motion.h1>

        <p className="text-gray-600 text-sm md:text-lg mt-2 px-5">
          Luxury beauty products curated to elevate your glow ✨
        </p>
      </section>

      {/* SECTIONS */}
      <ProductSection
        title="Press-On Nails"
        products={pressOnProducts}
        bgFrom="from-blue-50"
        bgTo="to-blue-100"
      />

      <ProductSection
        title="Nails & Lashes"
        products={nailsAndLashesProducts}
        bgFrom="from-pink-50"
        bgTo="to-pink-100"
      />

      <ProductSection
        title="Hair & Skin"
        products={hairAndSkinProducts}
        bgFrom="from-yellow-50"
        bgTo="to-yellow-100"
      />

    </main>
  );
}