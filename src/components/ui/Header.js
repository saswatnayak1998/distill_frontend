"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RunButton } from "."; // Import the RunButton component

export const Header = () => {
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn"); // Clear session
    router.push("/login"); // Redirect to login
  };

  return (
    <header className="relative p-6 bg-gradient-to-r from-teal-600/30 to-purple-600/30 backdrop-blur-xl border-b border-teal-400/20 shadow-2xl min-h-[100px]"> {/* Added min-h class */}

      <div className="max-w-7xl mx-auto flex justify-center items-center relative">
        {/* Centered "distill" Title */}
        <h1 className="text-6xl font-bold text-white">
          distill
        </h1>
      </div>

      {/* Logout Button at the Top Right */}
      <div className="absolute top-7 right-6">
        <RunButton
          isLoading={false}
          onClick={handleLogout}
          label="Log Out"
          gradientFrom="from-red-500"
          gradientTo="to-orange-600"
          icon="🚪"
          className="px-4 py-2"
        />
      </div>
    </header>
  );
};

export default Header;
