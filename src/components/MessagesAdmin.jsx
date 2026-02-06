"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function MessagesAdmin({ handleDelete }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (snap) =>
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-center text-2xl font-bold pt-6 pb-2 text-blue-900">
        Messages
      </h1>
      <p className="text-sm font-semibold  text-center text-gray-700">
        View and manage all client inquiries
      </p>
      {messages.length === 0 ? (
        <p className="text-center text-gray-700">No messages yet.</p>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            className="p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex justify-between items-start text-xs text-black"
          >
            <div className="flex flex-col gap-1">
              <p><strong>Name:</strong> {m.name}</p>
              <p><strong>Contact:</strong> {m.email}</p>
              <p><strong>Message:</strong> {m.message}</p>
            </div>
            <Trash2
              size={20}
              className="text-red-600 cursor-pointer hover:text-red-800"
              onClick={() => handleDelete("messages", m.id)}
            />
          </div>
        ))
      )}
    </div>
  );
}
