"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import UploadQuestionPage from "@/components/UploadQuestionPage";

export default function UploadQuestionWrapper() {
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId"); // Extract testId from URL query params

  if (!testId) {
    return (
      <div className="text-center text-red-400 p-6">
        ❌ Error: Missing test ID. Please select a test first.
      </div>
    );
  }

  return <UploadQuestionPage testId={testId} />;
}
