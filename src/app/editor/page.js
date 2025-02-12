"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import CodeEditor from "@/components/CodeEditor"; // Import the actual editor component

export default function EditorPage() {
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [router]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      {/* Render the actual editor component */}
      <CodeEditor />
    </div>
  );
}
