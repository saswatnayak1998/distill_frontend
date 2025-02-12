"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import TestListPage from "@/components/TestListPage"; // Import the component to display tiles

export default function TestTile() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
    }
  }, [router]);

  // Retrieve candidateId from sessionStorage
  const candidateId = sessionStorage.getItem("candidateId");

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