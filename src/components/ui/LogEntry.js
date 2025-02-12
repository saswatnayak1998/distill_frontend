import React from 'react'; // Importing React

const LogEntry = ({ log }) => (
    <li className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 animate-fade-in">
      <span className="text-teal-400 font-mono text-sm">{log.timestamp}</span>
      <span className="mx-2 text-purple-400">•</span>
      <span className="text-gray-300">
        {log.action} → <span className="text-emerald-400">"{log.text}"</span>
      </span>
    </li>
  );
  export default LogEntry;
