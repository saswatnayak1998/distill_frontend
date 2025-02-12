import React, { useState } from "react";

const QuestionCard = ({ title, description, difficulty }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-700/50 transition-all">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
        {title}
      </h2>

      {/* Description */}
      <div className={`text-gray-300 leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}>
        {description}
      </div>

      {/* Difficulty */}
      <span className="block mt-2 text-teal-400 text-sm">
        Difficulty: <span className="font-mono">{difficulty}</span>
      </span>

      {/* Expand/Collapse Button */}
      <button
        className="mt-4 text-teal-500 hover:text-teal-400 text-sm font-semibold focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default QuestionCard;
