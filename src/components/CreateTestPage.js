"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateTestPage = () => {
  const [testName, setTestName] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null); // Reset success message before submitting

    try {
      const response = await fetch("https://backenddistill-production.up.railway.app/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: testName,
          description: testDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Test created successfully! You can now add questions.");
        
        // Clear form fields after successful submission
        setTestName("");
        setTestDescription("");
      } else {
        const errorData = await response.json();
        alert(`Failed to create test: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating test:", error);
      alert("An error occurred while creating the test.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      <div className="p-8 bg-gray-800/50 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-teal-400 mb-6">
          Create a New Test
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-500 text-white text-center rounded-md">
            {successMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-1">Test Name</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter the test name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Test Description</label>
            <textarea
              value={testDescription}
              onChange={(e) => setTestDescription(e.target.value)}
              placeholder="Enter a short description for the test"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-all"
            disabled={loading}
          >
            {loading ? "Creating Test..." : "Create Test"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestPage;
