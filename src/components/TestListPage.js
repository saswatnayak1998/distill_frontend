"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TestTile from "@/components/ui/TestTile";

const TestListPage = ({ candidateId }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tests from the backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("https://backenddistill-production.up.railway.app:8080/get-tests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tests: ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: Expected an array");
        }

        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleTileClick = (testId) => {
    let storedCandidateId = sessionStorage.getItem("candidateId");
  
    console.log("Candidate ID from props:", candidateId);
    console.log("Candidate ID from sessionStorage:", storedCandidateId);
  
    if (!storedCandidateId || typeof storedCandidateId !== "string" || storedCandidateId.trim() === "") {
      alert("Candidate ID is missing! Please log in again.");
      router.push("/login");
      return;
    }
  
    router.push(`/questionstile?testId=${testId}&candidateId=${storedCandidateId}`);
  };
  

  const handleCreateTestClick = () => {
    router.push("/create_test");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="text-center text-xl font-semibold">
          Loading tests...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-12">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-teal-400">Test Dashboard</h1>
          <button
            onClick={handleCreateTestClick}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
          >
            Create New Test
          </button>
        </div>

        {/* Test List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.length > 0 ? (
            tests.map((test) => (
              <TestTile
                key={test.id}
                test={test}
                onClick={() => handleTileClick(test.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-300 text-xl font-semibold">
              No tests available. Create a new test to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestListPage;