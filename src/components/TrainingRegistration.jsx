"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CalendarDays, ArrowLeft, CheckCircle } from "lucide-react";

const courseInfo = {
  "nail-technology": {
    title: "Nail Technology Training",
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

export default function TrainingRegistration() {
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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    duration: "4 Weeks",
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

    try {
      setLoading(true);

      // Add your Firebase/API submission here

      console.log({
        course,
        courseName: selectedCourse.title,
        ...form,
      });

      alert("Registration submitted successfully!");

      router.push("/training");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-16">

      {/* HEADER */}
      <section className="relative h-[300px] md:h-[360px] overflow-hidden">

        <img
          src="/images/training.jpg"
          alt="Paradise WBL Training"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">

          <p className="uppercase tracking-[3px] text-sm mb-3 text-gray-200">
            Paradise WBL Studio
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold">
            Training Registration
          </h1>

          <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-200">
            Complete your registration below to begin your professional
            training journey with Paradise WBL Studio.
          </p>

        </div>
      </section>


      {/* FORM CONTAINER */}
      <div className="max-w-4xl mx-auto px-5">

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
            Selected Training
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mt-2">
            {selectedCourse.title}
          </h2>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {selectedCourse.subtitle}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-900">
            <CalendarDays size={18} />
            Training Duration: 4 Weeks
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
              <h2 className="text-xl font-bold text-blue-950">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Please provide your correct personal information.
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
                  rows="3"
                  required
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />
              </div>

            </div>

          </section>


          {/* TRAINING INFORMATION */}
          <section>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-950">
                Training Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Select your preferred training start date.
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
                  <option value="4 Weeks">
                    4 Weeks
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
                  Previous Experience
                  <span className="text-gray-400 font-normal">
                    {" "} (Optional)
                  </span>
                </label>

                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Tell us about any previous training or experience you have."
                  rows="3"
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 text-black outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-900"
                />

                <p className="text-xs text-gray-500 mt-2">
                  If you are applying for an upgrade, please include your
                  previous training or experience.
                </p>
              </div>

            </div>

          </section>


          {/* EMERGENCY CONTACT */}
          <section>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-950">
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
              read, understood, and agree to abide by the rules and
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
      {showPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">

          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">

            <div className="p-6 border-b flex justify-between items-center">

              <h2 className="text-xl font-bold text-blue-950">
                Training Rules & Regulations
              </h2>

              <button
                type="button"
                onClick={() => setShowPolicy(false)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                ×
              </button>

            </div>


            <div className="p-6 text-gray-700 space-y-4 leading-relaxed">

              <p>
                All trainees are expected to conduct themselves
                professionally throughout their training period at
                Paradise WBL Studio.
              </p>

              <p>
                Trainees must respect instructors, other trainees,
                clients, equipment and the training environment.
              </p>

              <p>
                Trainees are expected to attend their scheduled training
                sessions and actively participate in practical activities.
              </p>

              <p>
                Any additional rules and requirements communicated by
                Paradise WBL Studio must also be followed.
              </p>

            </div>


            <div className="p-6 border-t flex justify-end">

              <button
                type="button"
                onClick={() => setShowPolicy(false)}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}