"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { X } from "lucide-react";

export default function StudentForm() {
  const [loading, setLoading] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    type: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyEmail: "",
    duration: "",
    studentSignature: "",
    guardianSignature: "",
    agree: false,
  });

  const servicePackages = {
    Nails: [
      { label: "4 Weeks", price: 80000 },
      { label: "8 Weeks", price: 150000 },
      { label: "12 Weeks", price: 200000 },
    ],

    // Lashes: [
    //   { label: "2 Weeks ", price: 85000 },
    //   { label: "1 Months", price: 120000 },
    //   { label: "2 Months", price: 200000 },
    // ],

    // "Micro Blading": [
    //   { label: "2 Weeks ", price: 100000 },
    //   { label: "1 Months", price: 150000 },
    //   { label: "2 Months", price: 250000 },
    // ],

    // Makeover: [
    //   { label: "1 Month", price: 100000 },
    //   { label: "4 Months", price: 150000 },
    // ],

    Pedicure: [
      { label: "2 Weeks", price: 40000 },
      { label: "1 Months", price: 60000 },
    ],
  };

  const packages = servicePackages[form.type] || [];
  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.label === form.duration);
  }, [packages, form.duration]);

  const totalPrice = selectedPackage?.price || 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "type") {
      setForm((prev) => ({
        ...prev,
        type: value,
        duration: "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.type) return alert("Select training type");
    if (!form.agree) return alert("You must accept rules & policy");

    setLoading(true);

    try {
      await addDoc(collection(db, "students"), {
        ...form,
        price: totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);

      setForm({
        type: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        date: "",
        emergencyName: "",
        emergencyPhone: "",
        emergencyEmail: "",
        duration: "",
        studentSignature: "",
        guardianSignature: "",
        agree: false,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50 px-4 pt-12">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 my-14 space-y-5 "
      >

        {/* LOGO HEADER */}
        <div className="text-center space-y-2">
          <img
            src="/images/paradise.jpg"
            alt="Paradise Logo"
            className="w-20 h-20 mx-auto object-contain"
          />

          <p className="text-xl font-bold text-red-700 tracking-wide p-3">
            Student Registration & Training Agreement Form
          </p>
          {/* SUBHEAD */}
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Join Paradise Training Academy and gain hands-on experience in professional beauty,
            nail artistry, and salon services. Complete this form to begin your journey with us.
          </p>
        </div>

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 mx-auto gap-3">
          <div className="grid gap-2">
            <label htmlFor="" className="text-black font-normal">Name: </label>
            <input
              name="name"
              placeholder="Enter Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-black font-normal">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-black font-normal">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="" className="text-black font-normal">Address: </label>

            <input
              name="address"
              placeholder="Enter Home Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="" className="text-black font-normal">Date: </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl text-black mt-1 w-full"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="" className="text-black font-normal">Emergency Contact Name: </label>
            <input
              name="emergencyName"
              placeholder="Enter Full Name"
              value={form.emergencyName}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-black font-normal">
              Emergency Contact Phone No:
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              placeholder="Enter Phone Number"
              value={form.emergencyPhone}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-black font-normal">
              Emergency Contact Email:
            </label>
            <input
              type="email"
              name="emergencyEmail"
              placeholder="Enter Email Address"
              value={form.emergencyEmail}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            />
          </div>
          {/* PACKAGES AND PRICES */}
          <div className="grid gap-2">
            <label htmlFor="" className="text-black font-normal">Select Service: </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl text-black mt-1"
            >
              <option value="">Select Service</option>
              <option value="Nails">Nails</option>
              {/* <option value="Lashes">Lashes</option> */}
              {/* <option value="Micro Blading">Micro Blading</option> */}
              {/* <option value="Makeover">Makeover</option> */}
              <option value="Pedicure">Pedicure</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="" className=" text-black font-normal">Duration: </label>
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              required
              disabled={!form.type}
              className="w-full border p-3 rounded-xl text-black mt-1 disabled:bg-gray-100"
            >
              <option value="">
                {form.type
                  ? "Select Duration"
                  : "Select Service First"}
              </option>

              {packages.map((p, i) => (
                <option key={i} value={p.label}>
                  {p.label} - ₦{p.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* PRICE */}
        {form.duration && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl text-center font-bold">
            Total Fee: ₦{totalPrice.toLocaleString()}
          </div>
        )}

        {/* POLICY */}
        <div className="bg-blue-50 p-4 rounded-xl text-sm text-gray-800 space-y-3">

          <p className="text-sm text-gray-700 leading-relaxed">
            I, <span><input type="text" className="border-b border-b-1 px-2" />,</span> confirm that all information provided is correct and have read, understood, and
            agree to abide by the rules and regulations of Paradise WBL Studio
            throughout my apprenticeship/training period.
          </p>


          <span
            onClick={() => setShowPolicy(true)}
            className="text-red-700 font-bold underline cursor-pointer"
          >
            View Training Rules & Regulations
          </span>

          <label className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-blue-950 hover:bg-blue-900 disabled:opacity-60 text-white p-3 rounded-xl text-sm font-semibold"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {/* POLICY MODAL */}
      <AnimatePresence>
        {showPolicy && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative border-b px-6 py-4 bg-white">
                <h2 className="text-xl font-bold text-red-700 text-center pr-10">
                  RULES & REGULATIONS
                </h2>

                <button
                  type="button"
                  onClick={() => setShowPolicy(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-50 transition"
                  aria-label="Close"
                >
                  <X size={22} className="text-red-700" />
                </button>
              </div>
              {/* Scrollable Content */}
              <div className="max-h-[80vh] overflow-y-auto px-6 py-5">
                <ol className="space-y-4 text-sm text-gray-800 list-decimal pl-5">
                  <li>All students must be punctual and attend training sessions regularly.</li>

                  <li>
                    Training sessions are held three (3) times per week for all courses,
                    except Nails and Pedicure training which are held four (4) times per week.
                    Students and instructors may mutually agree on suitable training days and
                    schedules, provided the required number of weekly sessions is maintained.
                  </li>
                  <li>
                    Absence from class must be communicated to the instructor in advance
                    whenever possible.
                  </li>

                  <li>
                    Students must dress neatly and maintain good personal hygiene at all
                    times.
                  </li>

                  <li>
                    Respect for instructors, fellow students, clients, and salon property is
                    mandatory.
                  </li>

                  <li>
                    Fighting, bullying, gossiping, disrespectful behavior, or the use of
                    abusive language will not be tolerated.
                  </li>

                  <li>
                    Mobile phones should not be used during training sessions except for
                    learning purposes or with permission.
                  </li>

                  <li>
                    Students must actively participate in all practical and theoretical
                    lessons.
                  </li>

                  <li>
                    No student should perform services on clients without the approval or
                    supervision of the instructor.
                  </li>

                  <li>
                    Students are responsible for the proper care of all tools, equipment, and
                    materials provided during training.
                  </li>

                  <li>
                    Workstations must be cleaned and sanitized before and after every
                    practical session.
                  </li>

                  <li>
                    Students must follow all health, safety, and sanitation procedures taught
                    during training.
                  </li>

                  <li>
                    Theft, dishonesty, or damage to salon property may result in immediate
                    dismissal from the program.
                  </li>

                  <li>
                    Students must maintain a professional attitude and conduct themselves in a
                    manner that reflects positively on the salon.
                  </li>

                  <li>
                    Training fees paid are non-refundable except where otherwise approved by
                    management.
                  </li>

                  <li>
                    Certificates will only be issued to students who successfully complete
                    the training requirements.
                  </li>

                  <li>
                    Students are expected to practice regularly and complete all assignments
                    given by their instructor.
                  </li>

                  <li>
                    Any concerns or complaints should be reported directly to management
                    rather than discussed publicly.
                  </li>

                  <li>
                    Repeated violation of these rules may lead to suspension or termination
                    of the apprenticeship.
                  </li>

                  <li>
                    Management reserves the right to amend these rules and take disciplinary
                    action when necessary.
                  </li>
                </ol>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESSFUL MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-2xl p-6 text-center shadow-2xl"
            >
              {/* LOGO */}
              <img
                src="/images/paradise.jpg"
                alt="Logo"
                className="w-16 h-16 mx-auto mb-3 object-contain"
              />

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-red-800">
                Congratulations!
              </h2>

              {/* MESSAGE */}
              <p className="text-gray-700 mt-3 leading-relaxed">
                Your application has been successfully submitted. <br />
                We appreciate your interest in <b>Paradise WBL Training Program</b>.
              </p>

              <p className="text-gray-600 mt-3 text-sm">
                We will contact you via the email or phone number you provided for
                <b> payment and confirmation of your enrollment.</b>
              </p>

              {/* HIGHLIGHT NOTE */}
              <div className="mt-4 bg-blue-50 text-red-800 p-3 rounded-xl text-sm">
                Please ensure your phone is reachable as our team will reach out shortly.
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-6 bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded-xl w-full"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
