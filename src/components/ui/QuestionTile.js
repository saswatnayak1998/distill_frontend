"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const QuestionTile = ({ question }) => {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState("");

  // ✅ Ensure `sessionStorage` runs only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCandidateId(sessionStorage.getItem("candidateId") || "");
    }
  }, []);

  const handleTileClick = () => {
    const title = question.description
      ? question.description.slice(0, 50)
      : "Untitled Question";

    router.push(
      `/editor?questionId=${question.id}` +
        `&title=${encodeURIComponent(title)}` +
        `&description=${encodeURIComponent(question.description || "No description available.")}` +
        `&referenceSolution=${encodeURIComponent(question.reference_solution || "")}` +
        `&candidateId=${encodeURIComponent(candidateId)}` // ✅ Safe candidateId handling
    );
  };

  return (
    <div
      className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all cursor-pointer"
      onClick={handleTileClick}
    >
      <h2 className="text-xl font-semibold text-teal-400">
        {"Question " + question.id}
      </h2>
      <p className="text-gray-300 mt-2">
        {question.question ? question.question.slice(0, 40) : "No description available."}
      </p>
    </div>
  );
};

export default QuestionTile;
