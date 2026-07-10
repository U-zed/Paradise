"use client";

import { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Book,
  User,
  MessageSquare,
  Package,
  ImageIcon,
  CirclePlus,
  ReceiptText,
  ClipboardList,
  ClipboardPlus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";


const menus = [
  {
    title: "Appointment Bookings",
    subtitle: "Manage all customer appointment requests for Paradise. View upcoming bookings, confirm or reschedule appointments, assign staff and keep your daily schedule organized.",
    icon: Book,
    href: "/admin/bookings",
    color: "bg-blue-800",
    border: "border-blue-800",
  },
  {
    title: "Student Applications",
    subtitle: "Review applications from aspiring nail technicians who want to train at Paradise. Approve qualified applicants, monitor application progress and manage student enrollments.",
    icon: User,
    href: "/admin/students",
    color: "bg-green-700",
    border: "border-green-700",
  },
  {
    title: "Customer Messages",
    subtitle: "Stay connected with your clients by managing enquiries, complaints, feedback and general messages received through the Paradise website in one organized inbox.",
    icon: MessageSquare,
    href: "/admin/messages",
    color: "bg-pink-700",
    border: "border-pink-700",
  },
  {
    title: "Product Management",
    subtitle: "Manage Paradise's beauty products and accessories by adding new items, updating stock information, organizing categories and maintaining accurate inventory records.",
    icon: Package,
    href: "/admin/products",
    color: "bg-purple-700",
    border: "border-purple-700",
  },
  {
    title: "Gallery Management",
    subtitle: "Showcase Paradise's finest work by uploading, organizing and updating photos of completed nail designs, pedicure services, student projects and salon transformations.",
    icon: ImageIcon,
    href: "/admin/gallery",
    color: "bg-orange-700",
    border: "border-orange-700",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");   // --- Login State ---
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

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
        sessionStorage.setItem("adminLoggedIn", "true");
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

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");

    if (loggedIn === "true") {
      setIsAuthorized(true);
    }
  }, []);

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


  const navigate = (href) => {
    setLoading(true);
    router.push(href);
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


  if (loading) {
    return <Loader />;
  }
  // --- Admin Page UI ---
  return (
    <main className="min-h-screen bg-blue-50 pt-15 px-4 pb-10">
      {/* Content */}
      <div className="py-10  ">

        <div className="flex flex-col items-center  gap-8">

          <div className="flex justify-center items-center my-5 ">

            <Image
              src="/images/paradise.jpg"
              alt="Paradise Logo"
              width={100}
              height={100}
              className="rounded-bl-3xl rounded-tr-3xl bg-white shadow-black shadow-md object-cover"
            />
          </div>

          <div>

            <h2 className="text-2xl font-extrabold  text-center text-blue-950">
              Paradise WBL Management Dashboard
            </h2>

            <p className="text-gray-800 p-2 text-center">
              Your central workspace for managing every aspect of Paradise WBL. Oversee operations, monitor business performance and manage customers, services, products, inventory, bookings, training, staff, finances and more. <br /> All from one place.
            </p>

            <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-3">

              <button
                onClick={() => navigate("/services")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white text-black  border border-gray-800 rounded-full hover:bg-gray-300 cursor-pointer transition"
              >
                <ClipboardList size={18} />
                View Service
              </button>

              <button
                onClick={() => navigate("/expenses")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white text-black  border border-gray-800 rounded-full hover:bg-gray-300  cursor-pointer transition"
              >
                <ReceiptText size={18} />
                View Expense
              </button>

              <button
                onClick={() => navigate("/services/add")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-gray-600 text-white border border-gray-600 rounded-full hover:bg-gray-700 cursor-pointer transition"
              >
                <ClipboardPlus size={18} />
                Add Service
              </button>


              <button
                onClick={() => navigate("/expenses/add")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-full hover:bg-red-700  cursor-pointer transition"
              >
                <CirclePlus size={18} />
                Add Expense
              </button>
            </div>

          </div>

        </div>

      </div>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.title}
              onClick={() => navigate(menu.href)}
              className="group text-left w-full"
            >
              <div className={`flex flex-col items-center bg-white rounded-2xl border ${menu.border}  shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center`}>

                <div
                  className={`w-16 h-16 ${menu.color}  flex items-center rounded-br-3xl rounded-tl-3xl border justify-center text-white mb-5`}
                >
                  <Icon size={32} />
                </div>

                <h2 className="text-xl font-semibold text-black">
                  {menu.title}
                </h2>

                <p className="mt-2 text-gray-700 text-sm">
                  {menu.subtitle}
                </p>

              </div>
            </button>
          );
        })}

      </div>

      {/* Logout Button */}
      <div className="flex text-center justify-end w-full  mt-30 md:mt-10 ">
        <button
          className="flex text-center items-end justify-end gap-2 md:gap-4 p-2 md:px-4 rounded-xl border bg-white hover:bg-red-800 border-red-800 text-red-800 hover:text-white transition "
          onClick={() => {
            sessionStorage.removeItem("adminLoggedIn");
            setIsAuthorized(false);
            setUsername("");
            setPassword("");
          }}
        >
          <LogOut size={20} className="md:hidden mx-auto " />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

    </main>
  );
}
