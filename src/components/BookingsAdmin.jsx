"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Trash2 } from "lucide-react";

export default function BookingsAdmin({ handleDelete }) {
  const [bookings, setBookings] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Listen to bookings collection and order by booking time (latest first)
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) =>
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  const getCardColor = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(dateStr);
    bookingDate.setHours(0, 0, 0, 0);

    const diff = bookingDate.getTime() - today.getTime();

    if (diff === 0) return "bg-yellow-400 hover:bg-yellow-500"; // Today
    if (diff < 0) return "bg-red-400 hover:bg-red-500";         // Past
    if (diff === 24 * 60 * 60 * 1000) return "bg-green-400 hover:bg-green-500"; // Tomorrow
    return "bg-green-500 hover:bg-green-600";                    // Upcoming
  };

  const getDateLabel = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(dateStr);
    bookingDate.setHours(0, 0, 0, 0);

    const diff = bookingDate.getTime() - today.getTime();

    if (diff === 0) return "Current";
    if (diff < 0) return "Past";
    if (diff === 24 * 60 * 60 * 1000) return "Tomorrow";
    return "Upcoming";
  };

  // Show first 6 or all bookings based on showAll state
  const displayedBookings = showAll ? bookings : bookings.slice(0, 5);

  return (
    <main className="relative">
    <div className="overflow-auto [&::-webkit-scrollbar]:hidden scrollbar-none h-screen">
      <h1 className="text-center text-2xl font-bold pt-6 pb-3 text-blue-900">
        Bookings
      </h1>
      <p className="text-sm font-semibold text-center text-gray-700 pb-4">
        Manage and review all recent client appointments
      </p>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-700">No bookings yet.</p>
      ) : (
        displayedBookings.map((b) => (
          <div
            key={b.id}
            className={`relative  z-10 px-3 py-2 shadow-md border border-gray-700 text-xs text-black rounded transition-colors duration-500 ease-in-out ${getCardColor(
              b.date
            )} mb-0.5`}
          >
            {/* Date badge + delete icon */}
            <div className="absolute top-2 right-2 px-1 py-0.5 flex flex-row gap-1 text-center items-center shadow bg-white rounded-full">
              <span className="text-gray-900 text-[10px] font-semibold">
                {getDateLabel(b.date)}
              </span>
              <Trash2
                size={20}
                className="cursor-pointer text-red-600 hover:text-red-800"
                onClick={() => handleDelete("bookings", b.id)}
              />
            </div>

            {/* Booking details */}
            <div className="grid md:grid-cols-2 gap-y-1">
              <p>
                <strong>Name:</strong> {b.name}
              </p>
              <p>
                <strong>Contact:</strong> {b.contact} {b.email}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-y-1 mt-1">
              <p className="flex items-center gap-2">
                <strong>Date & Time:</strong> {b.date} {b.time}
              </p>
              <p>
                <strong>Payment:</strong> {b.payment}
              </p>
            </div>

            <p className="mt-1">
              <strong>Services:</strong> {b.selectedServices?.join(", ")}
            </p>
            {b.homeService && (
              <p className="mt-1">
                <strong>Address:</strong> {b.address}
              </p>
            )}
          </div>
        ))
      )}

      {/* Fixed View More / View Less Button */}
      {bookings.length > 5 && (
        <div className="sticky bottom-5 right-0 ml-auto w-32 z-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm px-3 py-2 bg-blue-900 ml-auto text-white rounded-full shadow hover:bg-blue-950 transition-colors"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
    </main>
  );
}
