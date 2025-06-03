import React from "react";
import { useAuth } from "../Auth/AuthContext";

const LoadingSpinner = () => {
  const { isAdmin } = useAuth();

  if (isAdmin === false || isAdmin === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-600">
        <div className="text-black text-4xl font-bold mb-4">403</div>
        <div className="text-black text-xl">Access Forbidden</div>
        <div className="text-black/80 mt-2">
          You do not have permission to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-transparent"></div>

        {/* Inner ring */}
        <div className="absolute top-1 left-1 w-14 h-14 border-4 border-indigo-500 rounded-full animate-[spin_1.5s_linear_infinite] border-l-transparent"></div>

        {/* Center dot */}
        <div className="absolute top-[18px] left-[18px] w-8 h-8 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
