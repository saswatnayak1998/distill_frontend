"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import QuestionListPage from "@/components/QuestionListPage";

export default function QuestionTileWrapper() {
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");

  if (!testId) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p className="text-lg font-semibold">
          ❌ No test selected. Please go back and select a test.
        </p>
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
      <QuestionListPage testId={testId} />
    </div>
  );
}
