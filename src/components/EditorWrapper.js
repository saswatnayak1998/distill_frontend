"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import CodeEditor from "@/components/CodeEditor"; // Import the actual editor component

export default function EditorWrapper() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId");

  if (!questionId) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p className="text-lg font-semibold">
          ❌ No question selected. Please go back and select a question.
        </p>
      </div>
    );
  }

  return <CodeEditor />;
}
