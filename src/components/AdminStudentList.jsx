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
        <div className="grid gap-2 pt-15 px-0">

<div className="shrink-0 ">
  
            <div className="flex justify-end  mt-1">
                <button
                    type="button"
                    onClick={() => router.push("/admin")}
                    className="p-2 bg-white text-red-600 hover:text-white rounded-full hover:bg-red-700 border border-redtransition"
                >
                    <ArrowLeft size={18} />
                </button>
            </div>

            <h2 className="text-3xl font-bold text-blue-900 text-center pb-2">
                Trainee Applications
            </h2>
            <p className="text-sm text-gray-800 text-center ">
                Manage incoming training applications, review applicant information, and approve eligible students for enrollment into the Paradise WBL training program.
            </p>
</div>

<div className="h-[calc(100%-50%)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
  
          {currentStudents.map((student) => (
  <div
    key={student.id}
    className="bg-gray-50  rounded-md shadow pt-1 pb-5 mb-3 text-black"
  >

    {/* PERSONAL INFORMATION */}
    <div className=" bg-gray-50   p-4">

      <h3 className="text-center font-bold text-red-900 border-b pb-2 mb-4">
        Personal Information
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Name:</p>
          <p className="font-semibold text-right">
            {student.fullName || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Phone No:</p>
          <p className="font-semibold text-right">
            {student.phone || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Email:</p>
          <p className="font-semibold text-right break-all">
            {student.email || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Address:</p>
          <p className="font-semibold text-right">
            {student.address || "N/A"}
          </p>
        </div>

      </div>

    {/* TRAINING INFORMATION */}

<h3 className="text-center font-bold text-red-900 border-b pb-2 mb-4 pt-6 ">
        Training Information
      </h3>

<div className="grid md:grid-cols-2 gap-4 text-sm">

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Program:</p>
          <p className="font-semibold text-right">
            {student.courseName || student.course || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Duration:</p>
          <p className="font-semibold text-right">
            {student.duration || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
        <p className="text-gray-500">
          Application ID:
        </p>

        <p className="font-semibold text-right">
          {student.applicationId || "N/A"}
        </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">Start Date:</p>
          <p className="font-semibold text-right">
            {student.startDate || "N/A"}
          </p>
        </div>

        <div className=" flex items-center justify-between">

          <p className="text-gray-500">
            Experience:
          </p>

          <p className="font-semibold text-right">
            {student.experience || "None provided "}
          </p>

        </div>

      </div>
    </div>

    {/* EMERGENCY CONTACT */}
    <div className="mt-4 bg-gray-50  p-4">

      <h3 className="text-center font-bold text-red-900 border-b pb-2 mb-4 ">
        Emergency / Guardian Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div className="flex items-center justify-between">
          <p className="text-gray-500">
            Contact Name:
          </p>

          <p className="font-semibold text-right">
            {student.emergencyName || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">
            Contact Phone:
          </p>

          <p className="font-semibold text-right">
            {student.emergencyPhone || "N/A"}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-500">
            Relationship:
          </p>

          <p className="font-semibold text-right">
            {student.emergencyRelationship || "N/A"}
          </p>
        </div>

      </div>

    </div>

    {/* ACTIONS */}
    <div className="flex justify-between gap-3 mt-5 px-7">

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

        </div>
    );
}