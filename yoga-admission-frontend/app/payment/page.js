"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoSVG from "../components/LogoSVG"; // Import the SVG component
import QRCode from "react-qr-code";

export default function Payment() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);

  const handlePayment = () => {
    setShowQR(true); // Display QR Code
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
      <div className="md:hidden flex justify-center w-24 h-24 sm:w-28 sm:h-28 mt-4">
        <LogoSVG />
      </div>

      {/* Main Content - Ensuring it pushes the footer down */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 text-center mb-4">
            Payment Page
          </h1>
          <h2 className="text-md sm:text-lg md:text-xl font-bold text-purple-800 text-center mb-6">
            Scan the QR code to complete your payment
          </h2>

          {/* Payment Details */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">
              <span className="font-medium">Batch:</span> 6-7AM
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-medium">Amount:</span> ₹500
            </p>
          </div>

          {/* Payment Button & QR Code */}
          {!showQR ? (
            <button
              onClick={handlePayment}
              className="w-full py-2 px-4 text-white bg-purple-500 rounded-md hover:bg-purple-600 transition-transform duration-200 transform hover:scale-105 shadow-md"
            >
              Pay Now
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <QRCode
                value="upi://pay?pa=satyakantsahu@upi&pn=Yoga+Classes&am=500&cu=INR"
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="Q"
              />
            </div>
          )}

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
      <footer className="w-full bg-purple-200 py-4 text-center text-purple-700 text-sm">
        © 2025 Dharma Yoga Center. All rights reserved.
      </footer>
    </div>
  );
}
