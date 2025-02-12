import { useState } from "react";

export const useRunCode = () => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const runCode = async (language, code) => {
    setIsLoading(true);
    setOutput(""); // Clear previous output
    try {
      const response = await fetch("http://localhost:8080/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.detail || "Failed to execute code.");
      }

      const result = await response.json();
      setOutput(result.output || "Execution completed with no output.");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const runTest = async (language, code, questionId, candidateId, copyPasteLogs) => {
    setIsLoading(true);
  
    try {
      console.log("🚀 Sending test request with logs:", copyPasteLogs);

      const response = await fetch("http://localhost:8080/run-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code,
          question_id: questionId,
          candidate_id: candidateId,
          copy_paste_logs: copyPasteLogs, 
          answer: "none"
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("✅ Test results:", result);
        setTestResults(result);
        return result; // ✅ Fix: Ensure result is returned
      } else {
        throw new Error(result.detail || "Test execution failed");
      }
    } catch (error) {
      console.error("❌ Error running tests:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    output,
    isLoading,
    runCode,
    runTest,
    testResults,
  };
};
