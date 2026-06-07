"use client";

import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AdminStudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔄 Real-time fetch
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "students"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setStudents(data);
            setLoading(false);
        });

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
        <div className="grid gap-4">
            {students.map((student) => (
                <div
                    key={student.id}
                    className="bg-white p-4 rounded-xl shadow space-y-1 border text-black"
                >
                    {/* NAME */}
                    <div className="flex justify-between">
                        <h2 className="text-base font-semibold text-black">
                            Trainee Application
                        </h2>
                        <span
                            className={`text-sm font-semibold  ${student.status === "accepted"
                                ? "text-green-600"
                                : "text-yellow-600"
                                }`}
                        >
                            {student.status || "pending"}
                        </span>
                    </div>

                    {/* DETAILS */}
                    <div className="grid md:grid-cols-2 space-y-3">
                        <div>
                            <h3 className="text-sm font-semibold text-center text-gray-700">
                                Apprentice Information
                            </h3>
                            <div className="grid grid-cols-2">
                                <p>Name:</p>
                                <p>{student.name}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Training Package:</p>
                                <p> {student.type}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Duration & Fee:</p>
                                <p> {student.duration}/₦{student.price?.toLocaleString()}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Phone Number:</p>
                                <p> {student.phone}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Email:</p>
                                <p> {student.email}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-center text-gray-700">
                                Emergency Contact Information
                            </h3>
                            <div className="grid grid-cols-2">
                                <p>Name:</p>
                                <p> {student.emergencyName}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Phone Number:</p>
                                <p>  {student.emergencyPhone}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p>Email:</p>
                                <p> {student.emergencyEmail}</p>
                            </div>
                        </div>
                    </div>

               
                    <p className="text-center text-sm text-red-600"> {student.address}</p>


                    {/* ACTIONS */}
                    <div className="flex justify-between gap-3 mt-3">
                        <button
                            onClick={() => handleAccept(student.id)}
                            className="bg-green-600 text-white px-4 py-1 rounded-lg"
                        >
                            Accept
                        </button>

                        <button
                            onClick={() => handleDelete(student.id)}
                            className="bg-red-600 text-white px-4 py-1 rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}