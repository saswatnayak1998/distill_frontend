"use client";

import React, { Suspense } from "react";
import UploadQuestionWrapper from "@/components/UploadQuestionWrapper"; // Wrapper Component

export default function UploadQuestion() {
  return (
    <Suspense fallback={<div className="text-white text-center p-6">Loading...</div>}>
      <UploadQuestionWrapper />
    </Suspense>
  );
}
