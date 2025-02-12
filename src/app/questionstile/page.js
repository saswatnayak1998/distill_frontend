"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Next.js App Router
import QuestionListPage from "@/components/QuestionListPage"; // Import the component to display tiles

export default function QuestionsTile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId"); // Extract testId from URL

  // Check if the user is logged in
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [router]);

  if (!testId) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p className="text-lg font-semibold">No test selected. Please go back and select a test.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-teal-300">
          Questions for Test ID: {testId}
        </h1>
      </div>
      {/* Render the list of questions dynamically */}
      <QuestionListPage testId={testId}/>
    </div>
  );
}
