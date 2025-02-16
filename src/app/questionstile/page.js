"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation"; // Only use router here
import QuestionTileWrapper from "@/components/QuestionTileWrapper"; // New Wrapper Component

export default function QuestionsTile() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [router]);

  return (
    <Suspense fallback={<div className="text-white text-center p-6">Loading questions...</div>}>
      <QuestionTileWrapper />
    </Suspense>
  );
}
