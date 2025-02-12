"use client";
import React from "react";
import { useRouter } from "next/navigation";

const TestTile = ({ test }) => {
  const router = useRouter();

  const handleClick = () => {
    const candidateId = sessionStorage.getItem("candidateId");
    if (!candidateId) {
      alert("Candidate ID is missing! Please log in again.");
      router.push("/login");
      return;
    }
    router.push(`/questionstile?testId=${test.id}&candidateId=${candidateId}`);
  };

  return (
    <div
      className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-xl font-semibold text-teal-400 mb-2">{test.name}</h3>
      <p className="text-gray-300 mb-4">{test.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Test ID: {test.id}</span>
        <button
          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-md transition-all"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Questions
        </button>
      </div>
    </div>
  );
};

export default TestTile;
