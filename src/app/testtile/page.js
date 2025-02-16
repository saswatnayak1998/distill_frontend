"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import TestListPage from "@/components/TestListPage"; // Import the component to display tiles

export default function TestTile() {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState(null); // ✅ Initialize state
  const [isClient, setIsClient] = useState(false); // ✅ Track client-side hydration

  useEffect(() => {
    setIsClient(true); // ✅ Ensure execution only happens on the client

    const loggedIn = sessionStorage.getItem("loggedIn");
    const storedCandidateId = sessionStorage.getItem("candidateId");

    if (!loggedIn) {
      router.push("/login");
    } else {
      setCandidateId(storedCandidateId); // ✅ Set candidateId only after hydration
    }
  }, [router]);

  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-teal-300">Select a Test</h1>
      </div>
      {/* Render the list of questions as tiles and pass candidateId as a prop */}
      <TestListPage candidateId={candidateId} />
    </div>
  );
}
