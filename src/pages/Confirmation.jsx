import React from "react";

const Confirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-green-700">🎉 Booking Confirmed!</h1>
        <p className="text-gray-700">Thank you for choosing Travel Mate. A confirmation has been sent to your email.</p>
      </div>
    </div>
  );
};

export default Confirmation;
