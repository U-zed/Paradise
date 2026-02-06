"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { Trash2, Edit2 } from "lucide-react";
import Image from "next/image";

export default function ProductsAdmin({ handleDelete }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    oldPrice: "",
    newPrice: "",
    image: "",
    collection: "presson-products",
  });
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    const productCollections = [
      "presson-products",
      "hair-skin-products",
      "nailsandlashes-products",
    ];

    const unsubProducts = productCollections.map((col) =>
      onSnapshot(collection(db, col), (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data(), collection: col }));
        setProducts((prev) => {
          const others = prev.filter((p) => p.collection !== col);
          return [...others, ...data];
        });
      })
    );

    return () => unsubProducts.forEach((u) => u());
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.newPrice || !newProduct.image)
      return alert("Please fill all required fields!");

    setLoading(true);
    try {
      await addDoc(collection(db, newProduct.collection), {
        ...newProduct,
        oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
        newPrice: Number(newProduct.newPrice),
        createdAt: serverTimestamp(),
      });
      alert("✅ Product added!");
      setNewProduct({
        name: "",
        desc: "",
        oldPrice: "",
        newPrice: "",
        image: "",
        collection: "presson-products",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product.");
    }
    setLoading(false);
  };

  const handleEditProduct = async (p) => {
    const name = prompt("Enter new name", p.name);
    const desc = prompt("Enter new description", p.desc);
    const newPrice = prompt("Enter new price", p.newPrice);
    const oldPrice = prompt("Enter old price", p.oldPrice || "");
    const image = prompt("Enter new image URL", p.image);

    if (!name || !newPrice || !image) return alert("Name, price, and image are required!");

    try {
      await updateDoc(doc(db, p.collection, p.id), {
        name,
        desc,
        oldPrice: oldPrice ? Number(oldPrice) : null,
        newPrice: Number(newPrice),
        image,
      });
      alert("✅ Product updated!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update product.");
    }
  };

  const visibleProducts = showAll ? products : products.slice(0, 10);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-center text-blue-900"> Products</h1>
<p className="text-sm font-semibold  text-center text-gray-700 pb-1">
    Manage and showcase all available products
  </p>
      {/* Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        className=" md:w-2/3 md:mx-auto bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="font-semibold text-md text-center text-orange-700">Add New Product </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 pt-2">

          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border border-gray-400 bg-gray-50 text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.desc}
            onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
            className="p-2 border border-gray-400 bg-gray-50 text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Old Price (optional)"
            value={newProduct.oldPrice}
            onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
            className="p-2 border border-gray-400 bg-gray-50 text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="New Price"
            value={newProduct.newPrice}
            onChange={(e) => setNewProduct({ ...newProduct, newPrice: e.target.value })}
            className="p-2 border border-gray-400 bg-gray-50 text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="p-2 border border-gray-400 bg-gray-50 text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
          <select
            value={newProduct.collection}
            onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })}
            className="p-2 border border-gray-400 bg-gray-50 text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="presson-products">Press-On</option>
            <option value="hair-skin-products">Hair & Skin</option>
            <option value="nailsandlashes-products">Nails & Lashes</option>
          </select>
          <button
            type="submit"
            className="col-span-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-950 transition-all font-semibold"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>

      {/* Products List */}

      <div className="pt-5">
        <h2 className="font-semibold text-md text-center text-orange-700">Manage Products</h2>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2 pt-4">

          {visibleProducts.map((p) => (

            <div
              key={p.id}
              className="relative group rounded overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
            >

              <div className="w-full h-48 relative">
                <Image src={p.image} alt={p.name} fill className="object-cover" />

                {/* Overlay for edit & delete icons */}
                <div className="absolute top-0 left-0 w-full flex justify-between p-1">
                  <Edit2
                    size={22}
                    className="cursor-pointer bg-white/50 p-1 rounded text-blue-900 hover:text-blue-950 transition-all"
                    onClick={() => handleEditProduct(p)}
                  />
                  <Trash2
                    size={22}
                    className="cursor-pointer bg-white/50 p-1 rounded text-red-600 hover:text-red-800 transition-all"
                    onClick={() => handleDelete(p.collection, p.id)}
                  />
                </div>

                {/* Overlay for name & category */}
                <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white px-2 py-1 flex flex-col">
                  <p className="text-center font-semibold text-xs truncate">{p.name}</p>
                  <p className="text-xs truncate">
                    {p.collection === "presson-products"
                      ? "Press-On"
                      : p.collection === "hair-skin-products"
                        ? "Hair & Skin"
                        : "Nails & Lashes"}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* view more or less button */}
      {products.length > 10 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 rounded-full border border-blue-600 text-blue-900 font-medium hover:bg-blue-950 cursor-pointer hover:text-white transition-all"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}

    </div>
  );
}
