import ActivityLog from "./ActivityLog";
import React from "react"; // Importing React

const OutputPanel = ({ output, isLoading, copyPasteLogs, testResults, isTesting }) => {
  // ✅ Ensure testResults is always defined
  const hasTestResults = testResults && Array.isArray(testResults.tests);

  return (
    <div className="h-full flex flex-col p-6 space-y-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-lg">
      <div className="flex-grow flex flex-col">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
          {hasTestResults ? "Test Results" : "Execution Results"}
        </h2>

        <pre className="flex-grow bg-gray-900/75 rounded-xl p-6 font-mono overflow-auto border border-gray-700/50 shadow-inner scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <code className={`block ${hasTestResults ? (testResults.success ? "text-emerald-400" : "text-rose-400") : output ? "text-emerald-400" : "text-gray-500"}`}>
            {hasTestResults ? (
              <>
                {testResults.tests.length > 0 ? (
                  testResults.tests.map((test, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex items-center gap-2">
                        <span className={test.passed ? "text-emerald-400" : "text-rose-400"}>
                          {test.passed ? "✓" : "✗"}
                        </span>
                        <span className="text-gray-300">Test Case #{index + 1}:</span>
                        <span className={test.passed ? "text-emerald-400" : "text-rose-400"}>
                          {test.passed ? "Passed" : "Failed"}
                        </span>
                      </div>
                      {!test.passed && (
                        <div className="ml-6 text-rose-300">
                          Expected: {test.expected || "N/A"}<br />
                          Actual: {test.actual || "N/A"}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">No test results available.</p>
                )}

                <div className="mt-4 border-t border-gray-700 pt-4">
                  Results: {testResults.passed || 0}/{testResults.total || 0} passed
                </div>
              </>
            ) : output ? (
              output
            ) : isLoading || isTesting ? (
              "🔄 Processing your request..."
            ) : (
              "💡 Results will appear here"
            )}
          </code>
        </pre>
      </div>

      <ActivityLog copyPasteLogs={copyPasteLogs} />
    </div>
  );
};

export default OutputPanel;
