"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoSVG from "../components/LogoSVG"; // Import the SVG component

export default function ChangeBatch() {
  const [formData, setFormData] = useState({
    email: "",
    newBatch: "6-7AM",
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleBatchChange = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setFeedback({
        type: "error",
        message: "Please enter your email to change batch.",
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/change-batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          batch_id: {
            "6-7AM": 1,
            "7-8AM": 2,
            "8-9AM": 3,
            "5-6PM": 4,
          }[formData.newBatch],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Batch changed successfully!",
        });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setFeedback({
          type: "error",
          message: result.message || "Failed to change batch.",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">
      {/* Logo (Left for large screens, Top Center for small screens) */}
      <div className="absolute top-4 left-4 hidden md:block w-16 h-16 md:w-32 md:h-32 lg:w-48 lg:h-48">
        <LogoSVG />
      </div>
      <div className="md:hidden flex justify-center w-24 h-24 sm:w-28 sm:h-28 mt-1 mx-auto">
        <LogoSVG />
      </div>

      {/* Centered Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 text-center mb-4">
            Change Your Yoga Batch
          </h1>
          <h2 className="text-md sm:text-lg md:text-xl font-bold text-purple-800 text-center mb-6">
            Enter your email and select a new batch
          </h2>

          {feedback.message && (
            <div
              className={`mb-4 text-center py-2 px-4 rounded ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleBatchChange} className="space-y-4">
            <div>
              <label className="block text-purple-800 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-purple-800 font-medium">
                Select New Batch
              </label>
              <select
                value={formData.newBatch}
                onChange={(e) =>
                  setFormData({ ...formData, newBatch: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300 text-black"
              >
                <option value="6-7AM">6-7AM</option>
                <option value="7-8AM">7-8AM</option>
                <option value="8-9AM">8-9AM</option>
                <option value="5-6PM">5-6PM</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-purple-500 rounded-md hover:bg-purple-600 transition-transform duration-200 transform hover:scale-105 shadow-md"
            >
              Change Batch
            </button>
          </form>

          {/* Back to Home Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push("/")}
              className="w-full py-2 px-4 text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-transform duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Always at Bottom */}
      <footer className="w-full bg-purple-200 py-4 text-center text-purple-700 text-sm mt-auto">
        © 2025 Dharma Yoga Center. All rights reserved.
      </footer>
    </div>
  );
}
