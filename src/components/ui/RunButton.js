import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const RunButton = ({ isLoading, onClick, label, gradientFrom = '', gradientTo = '', icon }) => (
    <button
    onClick={onClick}
    disabled={isLoading}
    className={`px-8 py-3 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:${gradientFrom.replace('500', '400')} hover:${gradientTo.replace('600', '500')} text-white font-semibold rounded-lg transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-teal-400/20 disabled:opacity-50 disabled:transform-none`}
  >
    <div className="flex items-center gap-3">
      {isLoading ? <LoadingSpinner className="w-5 h-5 text-current" /> : <span className="text-xl">{icon}</span>}
      {isLoading ? "Processing..." : label}
    </div>
  </button>
);
  
  export default RunButton;
  