"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
    collection,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AdminStudentList() {
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(students.length / itemsPerPage);

    // 🔄 Real-time fetch
  useEffect(() => {
    const unsub = onSnapshot(
        collection(db, "students"),
        (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Students from Firebase:", data);

            setStudents(data);
            setLoading(false);
        },
        (error) => {
            console.error("Firebase students error:", error);
            setLoading(false);
        }
    );

    return () => unsub();
}, []);

    // ❌ Delete student
    const handleDelete = async (id) => {
        const confirmDelete = confirm("Delete this application?");
        if (!confirmDelete) return;

        await deleteDoc(doc(db, "students", id));
    };

    // ✅ Accept student
    const handleAccept = async (id) => {
        await updateDoc(doc(db, "students", id), {
            status: "accepted",
        });
    };

    if (loading) {
        return <p className="text-center">Loading applications...</p>;
    }

    if (students.length === 0) {
        return <p className="text-center">No applications found</p>;
    }

    return (
        <div className="grid gap-4 pt-15">

            <div className="flex justify-end  mb-5 pt-10">
                <button
                    type="button"
                    onClick={() => router.push("/admin")}
                    className="p-2 bg-white text-red-600 hover:text-white rounded-full hover:bg-red-700 border border-redtransition"
                >
                    <ArrowLeft size={18} />
                </button>
            </div>


            <h2 className="text-3xl font-bold text-blue-900 text-center pt-6 pb-2">
                Trainee Applications
            </h2>
            <p className="text-sm text-gray-800 text-center max-w-2xl mx-auto pb-6">
                Manage incoming training applications, review applicant information, and approve eligible students for enrollment into the Paradise WBL training program.
            </p>
          {currentStudents.map((student) => (
  <div
    key={student.id}
    className="bg-gray-200 border rounded-2xl shadow p-5 text-black"
  >

    {/* HEADER */}
    <div className="flex justify-between items-center border-b pb-4">

      <div>
        <p className="text-xs text-gray-500 font-semibold uppercase">
          Application ID
        </p>

        <p className="font-bold text-blue-950">
          {student.applicationId || "N/A"}
        </p>
      </div>

      <span
        className={`text-xs font-bold px-3 py-1 rounded-full ${
          student.status === "accepted"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {student.status || "pending"}
      </span>

    </div>


    {/* PERSONAL INFORMATION */}
    <div className="mt-5 bg-gray-50 border rounded-xl p-4">

      <h3 className="font-bold text-red-900 border-b pb-2 mb-4">
        Personal Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-gray-500">Full Name</p>
          <p className="font-semibold">
            {student.fullName || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Phone Number</p>
          <p className="font-semibold">
            {student.phone || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Email Address</p>
          <p className="font-semibold break-all">
            {student.email || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Address</p>
          <p className="font-semibold">
            {student.address || "N/A"}
          </p>
        </div>

      </div>

    </div>


    {/* TRAINING INFORMATION */}
    <div className="mt-4 bg-gray-50 border rounded-xl p-4">

      <h3 className="font-bold text-red-900 border-b pb-2 mb-4">
        Training Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-gray-500">Training Program</p>
          <p className="font-semibold">
            {student.courseName || student.course || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Training Duration</p>
          <p className="font-semibold">
            {student.duration || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Preferred Start Date</p>
          <p className="font-semibold">
            {student.startDate || "N/A"}
          </p>
        </div>

        <div className="md:col-span-2">

          <p className="text-gray-500">
            Previous Training & Experience
          </p>

          <p className="font-semibold whitespace-pre-wrap">
            {student.experience || "No previous experience provided"}
          </p>

        </div>

      </div>

    </div>


    {/* EMERGENCY CONTACT */}
    <div className="mt-4 bg-gray-50 border rounded-xl p-4">

      <h3 className="font-bold text-red-900 border-b pb-2 mb-4">
        Emergency / Guardian Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-gray-500">
            Contact Name
          </p>

          <p className="font-semibold">
            {student.emergencyName || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Contact Phone
          </p>

          <p className="font-semibold">
            {student.emergencyPhone || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Relationship
          </p>

          <p className="font-semibold">
            {student.emergencyRelationship || "N/A"}
          </p>
        </div>

      </div>

    </div>


    {/* CONFIRMATION */}
    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">

      <h3 className="font-bold text-blue-950 mb-3">
        Applicant Confirmation
      </h3>

      <p className="text-sm">
        Confirmed by:{" "}
        <span className="font-semibold">
          {student.confirmationName || "N/A"}
        </span>
      </p>

      <p className="text-sm mt-1">
        Rules & Regulations:{" "}
        <span className="font-semibold">
          {student.agree ? "Agreed" : "Not Agreed"}
        </span>
      </p>

    </div>


    {/* ACTIONS */}
    <div className="flex justify-between gap-3 mt-5">

      <button
        onClick={() => handleAccept(student.id)}
        disabled={student.status === "accepted"}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg text-sm font-semibold"
      >
        {student.status === "accepted"
          ? "Accepted"
          : "Accept Application"}
      </button>

      <button
        onClick={() => handleDelete(student.id)}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold"
      >
        Delete
      </button>

    </div>

  </div>
))}

            <div className="flex justify-center items-center gap-4 mt-6 mb-4">

                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-blue-900 rounded-lg disabled:opacity-50 text-sm text-white"
                >
                    Prev
                </button>

                <span className="text-sm font-semibold text-blue-600">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-blue-900 rounded-lg disabled:opacity-50 text-sm text-white"
                >
                    Next
                </button>

            </div>

        </div>
    );
}