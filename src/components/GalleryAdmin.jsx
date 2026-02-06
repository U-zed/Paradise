"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryAdmin() {
  const [category, setCategory] = useState("nails");
  const [title, setTitle] = useState("");
  const [filename, setFilename] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [errorImages, setErrorImages] = useState({});

  const gridRef = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "gallery"), (snap) => {
      let data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Broken images first, then newest
      data.sort((a, b) => {
        const aBroken = errorImages[a.id] ? 1 : 0;
        const bBroken = errorImages[b.id] ? 1 : 0;
        if (aBroken !== bBroken) return bBroken - aBroken;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      });

      setItems(data);
    });

    return () => unsub();
  }, [errorImages]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !filename) return alert("Fill all fields");

    const imageUrl = `/gallery/${category}/${filename}`;
    setLoading(true);

    try {
      await addDoc(collection(db, "gallery"), {
        title,
        url: imageUrl,
        category,
        createdAt: serverTimestamp(),
      });
      alert("Image saved successfully!");
      setTitle("");
      setFilename("");
    } catch (err) {
      console.error(err);
      alert("Failed to save image");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      alert("Image deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  const visibleItems = showAll ? items : items.slice(0, 10);

  return (
    <div className="space-y-6 pt-6 p-3">
      <h1 className="text-2xl font-bold text-center text-blue-900">Gallery</h1>
      <p className="text-sm font-semibold text-center text-gray-700">
        Browse and manage all showcased works
      </p>

      {/* ADD FORM */}
      <form
        onSubmit={handleAdd}
        className="bg-white md:w-2/3 md:mx-auto p-4 rounded-xl shadow-md space-y-4"
      >
        <h2 className="font-semibold text-md text-center text-orange-700">
          Add New Gallery
        </h2>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full text-black"
        >
          <option value="nails">Nails</option>
          <option value="hairs">Hairs</option>
          <option value="lashes">Lashes</option>
        </select>

        <input
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full text-black"
          required
        />

        <input
          type="text"
          placeholder="e.g. gelplain.jpg"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="p-2 border rounded w-full text-black"
          required
        />

        {filename && (
          <div className="border rounded p-2">
            <p className="text-xs mb-2 text-gray-500">Preview</p>
            <Image
              src={`/gallery/${category}/${filename}`}
              alt="preview"
              width={200}
              height={200}
              className="rounded object-cover"
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-1 rounded"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* GALLERY LIST */}
      <div className=" pt-5 " ref={gridRef}>
        <h2 className="font-semibold text-md text-center text-orange-700">
          Manage Gallery
        </h2>

        <div className="relative z-50 grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-4 pt-4">
          {visibleItems.map((img) => (
            <motion.div
              key={img.id}
              className="bg-white rounded shadow relative group"
            >
              <Image
                src={img.url || "/placeholder.jpg"}
                alt={img.title}
                width={300}
                height={300}
                className="rounded object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                  setErrorImages((prev) => ({ ...prev, [img.id]: true }));
                }}
              />

              <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs p-2 text-center rounded-b">
                {img.title}
              </div>

              <Trash2
                size={19}
                className="absolute top-2 right-2 cursor-pointer bg-white/50 p-1 rounded text-red-600"
                onClick={() => handleDelete(img.id)}
              />
            </motion.div>
          ))}


          {/* FIXED VIEW MORE / LESS BUTTON */}
          {items.length > 10 && (
            <div className="absolute z-50 bottom-4 right-0 - ">
              <button
                onClick={() => setShowAll(!showAll)}
                className="p-2 rounded-full border border-blue-900 hover:bg-blue-950 hover:text-white  bg-white text-blue-900 font-medium text-sm shadow-md transition-all"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
