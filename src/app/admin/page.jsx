"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Book, MessageSquare, Package, ImageIcon } from "lucide-react";

// Components
import BookingsAdmin from "@/components/BookingsAdmin";
import MessagesAdmin from "@/components/MessagesAdmin";
import ProductsAdmin from "@/components/ProductsAdmin";
import GalleryAdmin from "@/components/GalleryAdmin";

export default function AdminPage() {
  // --- Login State ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  // --- Active Section ---
  const [activeSection, setActiveSection] = useState("bookings");

  // --- Handle Login via API ---
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthorized(true);
        setError("");
      } else {
        setError("❌ Incorrect username or Business Registration Number.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Login failed. Try again.");
    }
  };

  // --- Generic Delete Handler (pass to child components) ---
  const handleDelete = async (collectionName, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const { doc, deleteDoc } = await import("firebase/firestore");
      const { db } = await import("@/firebase/config");
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete item.");
    }
  };

  // --- Login Screen ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
        >
          <h2 className="text-2xl font-bold text-blue-900 text-center">
            Staff Login
          </h2>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Username */}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 text-black"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Business Registration Number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-950 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // --- Slide Animation Variants ---
  const slideVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.3 } },
  };

  // --- Admin Page UI ---
  return (
    <main className="flex min-h-screen bg-blue-50 pt-18">
      {/* Sidebar */}
      <aside className="sticky top-0 left-0 z-10 min-h-screen w-16 md:w-56 bg-blue-900 text-white flex flex-col pt-10 p-2 md:p-4 ">
        <div className="space-y-2 md:space-y-4">
          {[
            { key: "bookings", icon: <Book size={20} />, name: "Bookings" },
            { key: "messages", icon: <MessageSquare size={20} />, name: "Messages" },
            { key: "products", icon: <Package size={20} />, name: "Products" },
            { key: "gallery", icon: <ImageIcon size={20} />, name: "Gallery" },
          ].map((sec) => (
            <button
              key={sec.key}
              className={`flex items-center gap-2 md:gap-4 py-3 px-2 md:px-4 rounded hover:text-orange-500 transition ${
                activeSection === sec.key ? "text-orange-600" : ""
              }`}
              onClick={() => setActiveSection(sec.key)}
              title={sec.name}
            >
              <span className="md:hidden">{sec.icon}</span>
              <span className="hidden md:inline">{sec.name}</span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          className="flex text-center items-center gap-2 md:gap-4 p-2 md:px-4 rounded hover:text-red-800 transition text-red-600 mt-36 md:mt-0 bg-white"
          onClick={() => {
            setIsAuthorized(false);
            setPassword("");
            setUsername("");
          }}
        >
          <LogOut size={20} className="md:hidden mx-auto " />
          <span className="hidden md:inline">Logout</span>
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 p-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {activeSection === "bookings" && <BookingsAdmin handleDelete={handleDelete} />}
            {activeSection === "messages" && <MessagesAdmin handleDelete={handleDelete} />}
            {activeSection === "products" && <ProductsAdmin handleDelete={handleDelete} />}
            {activeSection === "gallery" && <GalleryAdmin />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
