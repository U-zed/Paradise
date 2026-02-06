"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import GalleryPage from "../gallery/page";

export default function ProductsPage() {
  const [pressOnProducts, setPressOnProducts] = useState([]);
  const [nailsAndLashesProducts, setNailsAndLashesProducts] = useState([]);
  // const [hairAndSkinProducts, setHairAndSkinProducts] = useState([]);

  useEffect(() => {
    const unsubPressOn = onSnapshot(
      collection(db, "presson-products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPressOnProducts(data);
      }
    );

    const unsubNails = onSnapshot(
      collection(db, "nailsandlashes-products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNailsAndLashesProducts(data);
      }
    );

    // const unsubHair = onSnapshot(
    //   collection(db, "hair-skin-products"),
    //   (snapshot) => {
    //     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     setHairAndSkinProducts(data);
    //   }
    // );

    return () => {
      unsubPressOn();
      unsubNails();
      // unsubHair();
    };
  }, []);

  const ProductCarousel = ({ products }) => {
    const x = useMotionValue(0);
    const containerRef = useRef();
    const indexRef = useRef(0);

    const loopItems = [...products, ...products, ...products];

    const [itemWidth, setItemWidth] = useState(0);

    // Set item width based on screen size
    const updateItemWidth = () => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.offsetWidth;
      if (window.innerWidth >= 1280) setItemWidth(width * 0.19); // 5 items → 19%
      else if (window.innerWidth >= 768) setItemWidth(width * 0.24); // 4 items → 24%
      else setItemWidth(width * 0.49); // 2 items → 49%
    };

    useEffect(() => {
      updateItemWidth();
      window.addEventListener("resize", updateItemWidth);
      return () => window.removeEventListener("resize", updateItemWidth);
    }, []);

    // Slide next
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

    // Slide previous
    const slidePrev = () => {
      indexRef.current -= 1;
      animate(x, -itemWidth * (products.length + indexRef.current), {
        type: "spring",
        stiffness: 120,
        damping: 20,
        onComplete: () => {
          if (indexRef.current < 0) {
            indexRef.current = products.length - 1;
            x.set(-itemWidth * (products.length + indexRef.current));
          }
        },
      });
    };

    // Auto-slide
    useEffect(() => {
      const interval = setInterval(slideNext, 3000);
      return () => clearInterval(interval);
    });

    // Drag handling
    const handleDragEnd = (event, info) => {
      if (!itemWidth) return;
      if (info.offset.x < -itemWidth / 2) slideNext();
      else if (info.offset.x > itemWidth / 2) slidePrev();
      else animate(x, -itemWidth * (products.length + indexRef.current), {
        type: "spring",
        stiffness: 120,
        damping: 20,
      });
    };

    return (
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-2 cursor-grab"
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
              className="flex-shrink-0 bg-pink-50 rounded-lg shadow-lg overflow-hidden flex flex-col items-center cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative w-full h-52 md:h-60 lg:h-64">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-90"
                />
              </div>

              <div className="py-1 h-fit text-center">
                <h3 className="text-sm md:text-base font-semibold text-gray-800">{p.name}</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-2">{p.desc}</p>
                <p className=" font-bold text-sm text-pink-800">
                  Starting from ₦{Number(p.newPrice).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Prev & Next Buttons */}
        <button
          onClick={slidePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-pink-600 hover:text-pink-800 py-1 px-2  z-10"
        >
          ◀
        </button>
        <button
          onClick={slideNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 text-pink-600 hover:text-pink-800 py-1 px-2  z-10"
        >
          ▶
        </button>
      </div>
    );
  };

  const ProductSection = ({ title, products, bgFrom, bgTo }) => (
    <section className={`bg-gradient-to-b ${bgFrom} ${bgTo} `}>

      <div className="max-w-6xl mx-auto p-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-left">
          {title}
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products available yet.</p>
        ) : (
          <ProductCarousel products={products} />
        )}
      </div>
    </section>
  );

  return (
    <main className="min-h-screen">
      <section className="text-center pt-22 pb-7 bg-gradient-to-b from-pink-200 to-blue-100">
        <motion.h1
          className="text-center text-3xl md:text-4xl font-bold text-pink-700 tracking-widest pb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           Press-Ons
        </motion.h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg px-5 py-3">
          Explore our collection of premium press-on nails designed to give you salon-perfect
          results in minutes. Swipe through our styles and find the perfect set to match
          your mood, your look and your moment.
        </p>
      </section>

      <ProductSection
        title="Shop Press-On Nails"
        products={pressOnProducts}
        bgFrom="from-blue-50"
        bgTo="to-blue-200"
      />
      {/* <ProductSection
        // title="Nails & Lashes"
        title="Nails"
        products={nailsAndLashesProducts}
        bgFrom="from-pink-50"
        bgTo="to-pink-200"
      /> */}
      {/* <ProductSection
        title="Hair & Skin"
        products={hairAndSkinProducts}
        bgFrom="from-yellow-50"
        bgTo="to-yellow-200"
      /> */}

      <GalleryPage />
    </main>
  );
}
