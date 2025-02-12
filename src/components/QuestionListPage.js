"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuestionTile from "@/components/ui/QuestionTile";

const QuestionListPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");
  const candidateId = searchParams.get("candidateId"); // Retrieve candidate_id from URL

  useEffect(() => {
    if (!testId || !candidateId) {
      alert("Test ID or Candidate ID is missing! Redirecting...");
      router.push("/testtile");
    }
  }, [testId, candidateId, router]);

  useEffect(() => {
    if (!testId) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://backenddistill-production.up.railway.app:8080/get-questions?test_id=${testId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: Expected an array");
        }

        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  const handleUploadClick = () => {
    router.push(`/upload_question?testId=${testId}&candidateId=${candidateId}`);
  };

  const handleBackToTests = () => {
    router.push("/testtile");
  };

  const handleTileClick = (questionId) => {
    router.push(`/editor?questionId=${questionId}&candidateId=${candidateId}`);
  };

  if (loading) {
    return <div className="text-center text-white p-6">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 p-6">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">
        Questions for Test ID: {testId}
      </h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={handleBackToTests}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Back to Tests
        </button>
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Upload New Question
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionTile
              key={question.id}
              question={question}
              onClick={() => handleTileClick(question.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-white">
            No questions available.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionListPage;