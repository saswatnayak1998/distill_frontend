"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UploadQuestionPage = () => {
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId"); // Extract the testId from query params
  const router = useRouter();

  const [questionText, setQuestionText] = useState("");
  const [testCases, setTestCases] = useState("");
  const [referenceSolution, setReferenceSolution] = useState("");
  const [maxScore, setMaxScore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedTestCases;
    try {
      parsedTestCases = JSON.parse(testCases);
      if (!Array.isArray(parsedTestCases)) {
        throw new Error("Test cases must be a JSON array.");
      }
    } catch (error) {
      alert("Invalid test cases format! Please enter valid JSON.");
      return;
    }

    const title = questionText.slice(0, 50); // Automatically derive title

    try {
      const response = await fetch("https://backenddistill-production.up.railway.app/upload-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test_id: parseInt(testId, 10),
          question: questionText,
          test_cases: parsedTestCases,
          reference_solution: referenceSolution || null, // Optional field
          max_score: parseInt(maxScore, 10),
        }),
      });

      if (response.ok) {
        alert("Question uploaded successfully!");
        router.push(`/questionstile?testId=${testId}`); // Redirect back to questions page
      } else {
        const errorData = await response.json();
        alert(`Failed to upload question: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error uploading question:", error);
      alert("An error occurred while uploading the question.");
    }
  };

  const handleBackToQuestions = () => {
    router.push(`/questionstile?testId=${testId}`); // Navigate back to the questions page
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      <div className="p-8 bg-gray-800/50 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-teal-400 mb-6">
          Upload Question for Test ID: {testId}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-1">Question</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter the question text"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Test Cases (JSON)</label>
            <textarea
              value={testCases}
              onChange={(e) => setTestCases(e.target.value)}
              placeholder='Enter test cases as JSON (e.g., [{"input": "[1,2,3]", "expected_output": "3"}])'
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Reference Solution</label>
            <textarea
              value={referenceSolution}
              onChange={(e) => setReferenceSolution(e.target.value)}
              placeholder="Enter the reference solution (code)"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Maximum Score</label>
            <input
              type="number"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
              placeholder="Enter the maximum score for this question"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBackToQuestions}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Back to Questions
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Upload Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadQuestionPage;