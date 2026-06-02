"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [homeService, setHomeService] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("Paying Full");
  const [loading, setLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  const homeServiceFee = 2500;

  /* SERVICES */
  const services = [
    { group: "Acrylic  (Hands)", name: "Acrylic Overlay", price: 4000 },
    { group: "Acrylic  (Hands)", name: "Short Acrylic", price: 6000 },
    { group: "Acrylic  (Hands)", name: "Medium Acrylic", price: 7500 },
    { group: "Acrylic  (Hands)", name: "Long Acrylic", price: 9000 },
    { group: "Acrylic  (Hands)", name: "XLong Acrylic", price: 12000 },

    { group: "Gel (Hands)", name: "Gel Overlay", price: 2000 },
    { group: "Gel (Hands)", name: "Short Gel ", price: 3500 },
    { group: "Gel (Hands)", name: "Medium Gel ", price: 4500 },
    { group: "Gel (Hands)", name: "Long Gel ", price: 5500 },
    { group: "Gel (Hands)", name: "XLong Gel ", price: 7000 },

    { group: "Toe Nails", name: "Gel Overlay", price: 1500 },
    { group: "Toe Nails", name: "Acrylic Overlay", price: 3000 },
    { group: "Toe Nails", name: "Gel Fixing (all toes)", price: 2500 },
    { group: "Toe Nails", name: "Big Toe Fixing", price: 2000 },
    { group: "Toe Nails", name: "Acrylic Toes", price: 4500 },

    { group: "Nail Art", name: "Double Nails (Hands)", price: 1500 },
    { group: "Nail Art", name: "Double Nails (Toes)", price: 1000 },
    { group: "Nail Art", name: "Marble Effects", price: 1500 },
    { group: "Nail Art", name: "French Tips", price: 1500 },
    { group: "Nail Art", name: "Double French Tips", price: 2500 },
    { group: "Nail Art", name: "Encapsulation", price: 4500 },
    { group: "Nail Art", name: "Cat Eye", price: 3000 },
    { group: "Nail Art", name: "Pigment", price: 1000 },
    { group: "Nail Art", name: "Custom Artwork", price: 3500 },
    { group: "Nail Art", name: "Ombre Nails", price: 1500 },
    { group: "Nail Art", name: "Charms", price: 500 },
    { group: "Nail Art", name: "3D Nail Art", price: 2000 },
    { group: "Nail Art", name: "Chrome", price: 1500 },

    { group: "Lashes", name: "Classic", price: 11000 },
    { group: "Lashes", name: "Hybrid", price: 15000 },
    { group: "Lashes", name: "Full Hybrid", price: 17000 },
    { group: "Lashes", name: "Volume", price: 20000 },
    { group: "Lashes", name: "Mega Volume", price: 25000 },

    { group: "Extras", name: "Whispy", price: 5000 },
    { group: "Extras", name: "Bottom Lashes", price: 5000 },
    { group: "Extras", name: "Lash Removal", price: 2000 },
    { group: "Extras", name: "Acrylic Removal (Hands)", price: 2000 },
    { group: "Extras", name: "Gel Polish Removal (Hands)", price: 1500 },
    { group: "Extras", name: "Toes Removal", price: 1500 },

    { group: "Beauty Enhancements", name: "Micro Blading", price: 35000 },
    { group: "Beauty Enhancements", name: "Studio Glam", price: 20000 },
    { group: "Beauty Enhancements", name: "Birthday Glam", price: 25000 },
    { group: "Beauty Enhancements", name: "Semi-perm Tat", price: "10000+" },
  ];

  /* GROUP SERVICES */
  const groupedServices = useMemo(() => {
    const groups = {};
    services.forEach((s) => {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(s);
    });
    return groups;
  }, [services]);

  /* TOTAL COST */
  const totalCost = useMemo(() => {
    const priceMap = Object.fromEntries(
      services.map((s) => [s.name, s.price])
    );

    let total = selectedServices.reduce(
      (sum, name) => sum + (priceMap[name] || 0),
      0
    );

    if (homeService) total += homeServiceFee;
    return total;
  }, [selectedServices, homeService, services]);

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        name,
        contact,
        selectedServices,
        homeService,
        address: homeService ? address : "",
        date,
        time,
        payment,
        totalCost,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit booking.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (submitted) {
      // Scroll to top smoothly when the success screen shows
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20 px-6 flex justify-center items-center">

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* LEFT */}
        {!submitted && (
          <div className="bg-gradient-to-br from-blue-500 to-gray-50 p-10 flex flex-col justify-center text-center">
            <h2 className="text-3xl font-extrabold text-red-700">
              Paradise
            </h2>
            <p className="mb-4 text-orange-800 font-semibold  rounded-xl px-4 1">
              Where Beauty Lives!
            </p>
            <p className="text-gray-900">
              Pamper yourself with our luxury beauty treats. Book now and glow all season!
            </p>

          </div>
        )}

        {/* RIGHT */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* name and contact */}
                <div className="grid grid-cols-2 gap-4 text-black">
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="clName" className="text-base font-medium">Name:</label>
                    <input
                      id="clName"
                      required
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-blue-700 rounded-xl px-4 py-2 outline-0 focus:bg-gray-100"
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="clContact" className="text-base font-medium">Contact:</label>
                    <input
                      id="clContact"
                      required
                      placeholder="Enter email or phone no:"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="border border-blue-700 rounded-xl px-4 py-2 outline-0 focus:bg-gray-100"
                    />
                  </div>
                </div>

                {/* CATEGORY BUTTONS */}
                <label htmlFor="clService" className="text-black
                   text-base font-medium ">Services:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-3">
                  {Object.keys(groupedServices).map((group) => (
                    <button
                      type="button"
                      key={group}
                      onClick={() =>
                        setActiveGroup(activeGroup === group ? null : group)
                      }
                      className={`px-4 py-2 rounded-xl text-sm font-semibold text-center
        ${activeGroup === group
                          ? "bg-blue-900 text-white border border-blue-700 transition-all"
                          : "bg-blue-100 text-blue-700 border border-blue-200 transition-all hover:bg-blue-200"
                        }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>

                {/* SERVICES */}
                <AnimatePresence>
                  {activeGroup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border border-gray-100 rounded bg-gray-100"
                    >
                      {groupedServices[activeGroup].map((item) => (
                        <label
                          key={item.name}
                          htmlFor={item.name}
                          className="flex justify-between items-center    cursor-pointer text-black text-base font-medium border border-gray-50 p-1 hover:bg-white transition"

                        >
                          <span>{item.name}</span>
                          <div className="flex gap-3 items-center">
                            <span className="text-purple-700 text-base font-medium">
                              ₦{item.price.toLocaleString()}
                            </span>
                            <input
                              id={item.name}
                              type="checkbox" className="w-4 h-4 accent-blue-600"

                              checked={selectedServices.includes(item.name)}
                              onChange={() => {
                                const isSelected = selectedServices.includes(item.name);

                                const singleSelectGroups = [
                                  "Acrylic  (Hands)",
                                  "Gel (Hands)",
                                  "Toe Nails",
                                  "Extras",
                                  "Beauty Enhancements",
                                  "Lashes",
                                ];

                                const acrylicSelected = selectedServices.some((s) =>
                                  groupedServices["Acrylic  (Hands)"]?.some((a) => a.name === s)
                                );

                                const gelSelected = selectedServices.some((s) =>
                                  groupedServices["Gel (Hands)"]?.some((g) => g.name === s)
                                );

                                // UNCHECKING (always allowed)
                                if (isSelected) {
                                  setSelectedServices((prev) => prev.filter((s) => s !== item.name));
                                  return;
                                }

                                // ACRYLIC ↔ GEL CONFLICT
                                if (
                                  (item.group === "Acrylic  (Hands)" && gelSelected) ||
                                  (item.group === "Gel (Hands)" && acrylicSelected)
                                ) {
                                  setPendingSelection(item);
                                  setShowConfirmModal(true);
                                  return;
                                }

                                // SINGLE SELECT GROUPS
                                if (singleSelectGroups.includes(item.group)) {
                                  setSelectedServices((prev) => [
                                    ...prev.filter(
                                      (s) => !groupedServices[item.group].some((i) => i.name === s)
                                    ),
                                    item.name,
                                  ]);
                                  return;
                                }

                                // MULTI SELECT (Nail Art + Extras)
                                setSelectedServices((prev) => [...prev, item.name]);
                              }}

                            />
                          </div>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Double nails  */}
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-red-700 text-xs font-bold ">Double nails are recommended for durability. Single nails are more prone to breakage if not properly handled. <b>Click "Nail Art" above to select double Nails for gel</b>.</p>
                </div>
                {/* date and time */}
                <div className="grid grid-cols-2 gap-4 text-black">
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="clDate" className="text-base font-medium">Date:</label>
                    <input type="date" min={new Date().toISOString().split("T")[0]} required id="clDate" value={date} onChange={(e) => setDate(e.target.value)} className="border border-blue-700 rounded-xl px-4 py-2 outline-0 focus:bg-gray-100" />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="clTime" className="text-base font-medium">Time:</label>
                    <input type="time" required id="clTime" value={time} onChange={(e) => setTime(e.target.value)} className="border border-blue-700 rounded-xl px-4 py-2 outline-0 focus:bg-gray-100" />
                  </div>
                </div>
                {/* Home Service */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-red-600 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={homeService}
                      onChange={() => setHomeService(!homeService)}
                      className="w-4 h-4 accent-red-500"
                    />
                    Home Service (optional)
                  </label>
                  {homeService && (
                    <div className="space-y-2">
                      <p className="text-sm text-black">
                        ⚠️ Sorry, home service is currently unavailable at the moment.
                      </p>
                      {/* <p className="text-purple-700 text-sm font-semibold">
                        Home Service Fee: ₦{homeServiceFee.toLocaleString()}
                      </p>
                      <div className="flex flex-col gap-1 text-black">
                        <label htmlFor="clAddress" className="text-base font-medium text-black">
                          Address:
                        </label>
                        <input
                          type="text"
                          required id="clAddress" value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter address:"
                          className="border border-blue-700 rounded-xl px-4 py-2 outline-0 focus:bg-gray-100"
                        />
                      </div> */}
                    </div>
                  )}
                </div>
                {/* Payment Option */}
                <div>
                  <div className="flex flex-col gap-2 text-black">
                    <label htmlFor="clPaymentMethod">Payment Option:</label>

                    <select value={payment} onChange={(e) => setPayment(e.target.value)} className="border border-blue-700 rounded-xl px-4 py-2 outline-0 focus:bg-gray-100 w-full text-gray-700">
                      <option>Full Payment</option>
                      <option>Deposit (Due After Service)</option>
                    </select>
                  </div>
                  <p className="text-black text-xs font-bold pt-1"><b className="text-red-600">Note: </b>Payment validates booking.</p>
                </div>

                <div className="bg-purple-100 text-purple-700 text-center font-bold p-3 rounded-xl">
                  Total: ₦{totalCost.toLocaleString()}
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-blue-900 hover:bg-blue-950 transition-all text-white py-3 rounded-xl"
                >
                  {loading ? "Submitting..." : "Confirm Booking"}
                </button>
              </motion.form>
            ) : (
              /* SUCCESS SCREEN */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-red-700">We Got Your Booking!</h3>
                <p className="text-black text-sm md:text-base"> Thank you,  <span className="text-blue-900 italic">{name}</span>, for choosing Paradise! <br /> We will reach out to you via <span className="italic text-blue-900">{contact}</span> for confirmation. </p>
                <div className="bg-orange-50 text-black rounded-xl border border-orange-200 text-sm md:text-base w-full max-w-md overflow-hidden">
                  <div className="grid grid-cols-2 border border-white py-2 px-3">
                    <p className="text-left">Date & Time:</p>
                    <p className="text-right">{date} {time}</p>
                  </div>
                  <div className="grid grid-cols-2 border border-white py-2 px-3">
                    <p className="text-left">Services:</p>
                    <p className="text-right">{selectedServices.join(", ")}</p>
                  </div>

                  {homeService && (
                    <div className="grid grid-cols-2 border border-white py-2 px-3">
                      <p className="text-left">Address:</p>
                      <p className="text-right">{address}</p>
                    </div>)}
                  <div className="flex justify-between border border-white py-2 px-3">
                    <p>Payment Method:</p>
                    <p>{payment}</p>
                  </div>
                  <div className="flex justify-between bg-white text-orange-700 text-sm font-semibold border border-white p-2">
                    <p>Total:</p>
                    <p>₦{totalCost.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedServices([]);
                    setHomeService(false);
                    setAddress(""); setDate("");
                    setTime("");
                    setPayment("Pay on Arrival");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full bg-blue-900 text-white py-2 rounded-xl hover:bg-blue-950 mt-4" > Done </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* confirm overwrite */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4"
            >
              <h3 className="text-lg font-semibold text-orange-600">
                Change Service?
              </h3>
              <hr />
              <p className="text-sm text-gray-800">
                You already selected a service from the opposite category.
                <br />
                (Only one service from Acrylic (Hands) or Gel (Hands) can be booked at a time.)</p>
              <hr />
              <p className="text-sm text-purple-700">
                Do you want to switch your selection?
              </p>

              <div className="flex gap-4">
                <button
                  className="w-full text-white bg-gray-500 hover:bg-gray-400 transition-all cursor-pointer rounded-xl py-2"
                  onClick={() => {
                    setPendingSelection(null);
                    setShowConfirmModal(false);
                  }}
                >
                  No
                </button>

                <button
                  className="w-full bg-orange-600 text-white hover:bg-orange-500 transition-all cursor-pointer rounded-xl py-2"
                  onClick={() => {
                    setSelectedServices((prev) =>
                      prev.filter(
                        (s) =>
                          !groupedServices[
                            pendingSelection.group ===
                              "Acrylic  (Hands)"
                              ? "Gel (Hands)"
                              : "Acrylic  (Hands)"
                          ]?.some((i) => i.name === s)
                      )
                    );

                    setSelectedServices((prev) => [
                      ...prev,
                      pendingSelection.name,
                    ]);

                    setPendingSelection(null);
                    setShowConfirmModal(false);
                  }}
                >
                  Yes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>);
}
