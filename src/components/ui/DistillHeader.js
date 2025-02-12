import React, { useEffect, useState } from "react";

const DistillHeader = ({ title = "distill", subtitle, bubbleCount = 20 }) => {
  const [bubbles, setBubbles] = useState([]);



  return (
    <header className="relative p-6 bg-gradient-to-r from-teal-600/30 to-purple-600/30 backdrop-blur-xl border-b border-teal-400/20 shadow-2xl overflow-hidden">
      {/* Floating Bubbles */}
      <div className="absolute inset-0 -z-10">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-teal-300 rounded-full opacity-30"
            style={{
              left: bubble.left,
              animation: `float ${bubble.duration}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Header Content */}
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">
        <h1 className="text-6xl font-bold font-sans rounded-lg bg-gradient-to-r from-teal-100 via-pink-400 to-orange-100 bg-clip-text text-transparent animate-gradient-x">
          {title}
        </h1>
        {subtitle && (
          <h2 className="mt-3 text-lg text-gray-200 text-center font-poppins">
            {subtitle}
          </h2>
        )}
        <div className="mt-4 h-1 w-24 bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 rounded-full opacity-70" />
      </div>
    </header>
  );
};

export default DistillHeader;