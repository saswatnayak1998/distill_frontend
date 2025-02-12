import React from 'react'; // Importing React
import { LogEntry } from '.';


const ActivityLog = ({ copyPasteLogs }) => (
    <div className="flex flex-col h-64">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
        Activity Monitor
      </h2>
      <div className="flex-grow bg-gray-900/75 rounded-xl p-6 border border-gray-700/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {copyPasteLogs.length === 0 ? (
          <p className="text-gray-500 italic">No suspicious activity detected ✅</p>
        ) : (
          <ul className="space-y-3">
            {copyPasteLogs.map((log, index) => (
              <LogEntry key={index} log={log} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  export default ActivityLog;
  