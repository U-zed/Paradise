"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  ArrowLeft,
  CheckCircle,
  X,
  Copy,
  MessageCircle,
} from "lucide-react";import { motion, AnimatePresence } from "framer-motion";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase/config";


const courseInfo = {
  "nail-tech": {
    title: "Nail Tech. Training",
    subtitle:
      "Build professional nail technology skills through practical, hands-on training at Paradise WBL Studio.",
  },

  "makeup-artistry": {
    title: "Makeup Artistry Training",
    subtitle:
      "Learn professional makeup techniques, client preparation, product application and beauty transformation.",
  },

  "lash-extension": {
    title: "Lash Extension Training",
    subtitle:
      "Learn professional lash extension techniques, lash preparation, application, styling and safe removal.",
  },

  "microblading-tattoo": {
    title: "Microblading & Tattoo Training",
    subtitle:
      "Develop practical skills in professional brow artistry, microblading techniques and tattoo fundamentals.",
  },

  "pedicure-training": {
    title: "Pedicure Training",
    subtitle:
      "Learn professional pedicure techniques, nail care, foot care, sanitation and client service.",
  },

  "beauty-business": {
    title: "Beauty Business Training",
    subtitle:
      "Learn how to build, manage and grow a profitable beauty business with practical business knowledge.",
  },
};

function TrainingRegistrationContent() {
    const searchParams = useSearchParams();
  const router = useRouter();

  const course = searchParams.get("course");

  const selectedCourse =
    courseInfo[course] || {
      title: "Paradise WBL Training",
      subtitle:
        "Complete your registration to begin your professional beauty training journey with Paradise WBL Studio.",
    };

const [showPolicy, setShowPolicy] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const [loading, setLoading] = useState(false);
const [applicationId, setApplicationId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    duration: "",
    startDate: "",
    experience: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    confirmationName: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.agree) {
    alert("Please agree to the Training Rules & Regulations.");
    return;
  }

  if (!form.confirmationName.trim()) {
    alert("Please enter your name in the confirmation statement.");
    return;
  }

  try {
    setLoading(true);

const timestamp = Date.now().toString();

const newApplicationId =
    `pwbl${timestamp.slice(-4, -2)}reg${timestamp.slice(-2)}`;
    await addDoc(collection(db, "students"), {
      applicationId: newApplicationId,

      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      address: form.address,

      course: course,
      courseName: selectedCourse.title,

      duration: form.duration,
      startDate: form.startDate,
      experience: form.experience,

      emergencyName: form.emergencyName,
      emergencyPhone: form.emergencyPhone,
      emergencyRelationship: form.emergencyRelationship,

      confirmationName: form.confirmationName,
      agree: form.agree,

      status: "pending",

      createdAt: new Date(),
    });

    setApplicationId(newApplicationId);
    setShowSuccess(true);

  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-16">

      {/* FORM CONTAINER */}
      <div className="max-w-4xl mx-auto px-2">

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => router.push("/training")}
          className="flex items-center gap-2 mt-8 mb-6 text-blue-900 font-semibold hover:text-blue-700 transition"
        >
          <ArrowLeft size={18} />
          Back to Training
        </button>


        {/* COURSE INFORMATION */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-6">

          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Selected Program:
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mt-2">
            {selectedCourse.title}
          </h2>

          <p className="text-gray-700 mt-3 leading-relaxed">
            {selectedCourse.subtitle}
          </p>

         <div className="mt-5 flex items-start gap-2 text-sm font-semibold text-red-600">
  <CalendarDays size={18} className="mt-0.5 shrink-0" />
  <div>
    <b>Training Duration</b>
    <span className="ml-1 font-medium"><br />
      • Upgrade: 4 Weeks <br /> • Beginner: 8 Weeks <br />• Professional: 12 Weeks
    </span>
  </div>
</div>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8"
        >

          {/* PERSONAL INFORMATION */}
          <section>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-center text-blue-950">
                Personal Information
              </h2>

              <p className="text-sm text-gray-700 mt-1">
                Complete your registration below to begin your professional
            training journey with Paradise WBL Studio.
              </p>
            </div>


            <div className="grid md:grid-cols-2 gap-5">

              {/* FULL NAME */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>


              {/* PHONE */}
              <div>
                <label className="font-semibold text-gray-800">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>


              {/* EMAIL */}
              <div>
                <label className="font-semibold text-gray-800">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>


              {/* ADDRESS */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800">
                  Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your residential address"
                  rows="1"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>

            </div>

          </section>

<hr />
          {/* TRAINING INFORMATION */}
          <section>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-center text-blue-950">
                Training Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Select your preferred training start date and choose the duration that suits your learning goals and budget.
              </p>
            </div>


            <div className="grid md:grid-cols-2 gap-5">

              {/* DURATION */}
              <div>
                <label className="font-semibold text-gray-800">
                  Training Duration
                </label>

                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black bg-white outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                >
                         <option value="" disabled>
      Select Training Level
    </option>

    <option value="4 Weeks">
      Upgrade - 4 Weeks
    </option>

    <option value="8 Weeks">
      Beginner - 8 Weeks
    </option>

    <option value="12 Weeks">
      Professional - 12 Weeks
    </option>

                </select>
              </div>


              {/* START DATE */}
              <div>
                <label className="font-semibold text-gray-800">
                  Preferred Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>


              {/* EXPERIENCE */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800">
                 Previous Training & Experience
    <span className="text-gray-400 font-normal">
      {" "} (Required for Upgrade)
    </span>

                </label>

                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your previous beauty training, skills or salon experience."
                  rows="2"
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />

                <p className="text-xs text-red-600 mt-2">
                  Upgrade applicants must provide details of their previous beauty training or experience.
</p>
              </div>

            </div>

          </section>

<hr />
          {/* EMERGENCY CONTACT */}
          <section>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-center text-blue-950">
                Emergency / Guardian Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Provide someone we can contact in case of an emergency.
              </p>
            </div>


            <div className="grid md:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <label className="font-semibold text-gray-800">
                  Emergency Contact Name
                </label>

                <input
                  type="text"
                  name="emergencyName"
                  value={form.emergencyName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>


              {/* PHONE */}
              <div>
                <label className="font-semibold text-gray-800">
                  Emergency Contact Phone
                </label>

                <input
                  type="tel"
                  name="emergencyPhone"
                  value={form.emergencyPhone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>


              {/* RELATIONSHIP */}
              <div className="md:col-span-2">
                <label className="font-semibold text-gray-800">
                  Relationship
                </label>

                <input
                  type="text"
                  name="emergencyRelationship"
                  value={form.emergencyRelationship}
                  onChange={handleChange}
                  placeholder="e.g. Parent, Guardian, Spouse, Sibling"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>

            </div>

          </section>


          {/* POLICY */}
          <div className="bg-blue-50 p-5 rounded-xl text-sm text-gray-800 space-y-4">

            <p className="text-sm text-gray-700 leading-relaxed">

              I,{" "}

              <input
                type="text"
                name="confirmationName"
                value={form.confirmationName}
                onChange={handleChange}
                required
                className="border-b border-gray-500 bg-transparent px-2 py-1 outline-none w-40"
              />
              , confirm that all information provided is correct and have
              read, understood and agree to abide by the rules and
              regulations of Paradise WBL Studio throughout my
              apprenticeship/training period.

            </p>


            <button
              type="button"
              onClick={() => setShowPolicy(true)}
              className="text-red-700 font-bold underline cursor-pointer"
            >
              View Training Rules & Regulations
            </button>


            <label className="flex items-start gap-3 pt-2 cursor-pointer">

              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1"
              />

              <span>
                I agree to the terms and conditions
              </span>

            </label>

          </div>


          {/* SUBMIT */}
          <div className="flex justify-end pt-2">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition"
            >

              {loading ? (
                "Submitting Registration..."
              ) : (
                <>
                  <CheckCircle size={18} />
                  Submit Registration
                </>
              )}

            </button>

          </div>

        </form>

      </div>

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
                    Training sessions are held a minimum of three (3) times per week and a maximum of four (4) times per week, depending on the course.
                    Students and instructors may mutually agree on suitable training days and schedules, provided the required number of weekly sessions is maintained.
                  </li>

                  <li>
                    All students are required to have the “Beyond the Polish Guide” training book and the official studio uniform as part of their training materials and uniform.
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
  <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-3">

    <div className="bg-white w-full max-w-md rounded-xl p-4 text-center shadow-2xl max-h-[97vh]">


      {/* ========================= */}
      {/* BACK BUTTON */}
      {/* ========================= */}
<div className="w-full flex justify-end text-right ">

      <button
        type="button"
        onClick={() => router.push("/training")}
        className=" w-fit  text-red-700 hover:bg-red-700 hover:text-white p-1 rounded-full font-bold transition-all cursor-pointer"
      >
 <X size={25} />      
 </button>
</div>


      {/* LOGO */}
      <img
        src="/images/paradise.jpg"
        alt="Paradise WBL"
        className="w-18 h-18 mx-auto mb-3 object-contain rounded-full"
      />

  
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-blue-950 py-2">
        Congratulations!
      </h2>

      <p className="text-base text-gray-600 py-3 ">
        Your application has been successfully submitted.
We appreciate your interest in <b>Paradise WBL Training Program</b>.
      </p>


      {/* ========================= */}
      {/* WHATSAPP */}
      {/* ========================= */}

      <div className=" py-2">

      <div className="flex justify-between items-center text-center py-2 px-3">

        <p className="text-sm  text-gray-500 font-semibold">
           Application ID:
        </p>

<div className="flex gap-1 bg-gray-50 border border-blue-100 px-2 py-1 rounded-md">

        <p className="text-sm font-semibold text-gray-900  ">
          {applicationId}
        </p>

        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(applicationId);
          }}
          className=" text-blue-700 cursor-pointer hover:text-blue-900 flex items-center justify-center  "
        >
          <Copy size={16} />
           
        </button>
</div>

      </div>

        <p className="text-sm text-red-700 py-2 text-center">
          Please send your Application ID to Paradise WBL Studio
          on WhatsApp to continue with your payment and enrollment. 
        </p>

      </div>
        <button
          type="button"
          onClick={() => {
            const message = `Hello Paradise WBL Studio,

I have completed my training registration.

My Application ID is: ${applicationId}

Course: ${selectedCourse.title}

Please confirm my registration and provide the next steps for payment and enrollment.

Thank you.`;

            const whatsappUrl =
              `https://wa.me/2349031118322?text=${encodeURIComponent(message)}`;

            window.open(
              whatsappUrl,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="my-2 w-full bg-green-700 hover:bg-green-700 text-white py-3 px-5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <MessageCircle size={21} />
          Click To Send
        </button>

    </div>

  </div>
)}
      </AnimatePresence>

    </main>
  );
}

export default function TrainingRegistration() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              Loading registration...
            </p>
          </div>
        </main>
      }
    >
      <TrainingRegistrationContent />
    </Suspense>
  );
}