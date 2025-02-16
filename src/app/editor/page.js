"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import EditorWrapper from "@/components/EditorWrapper"; // New Wrapper Component

export default function EditorPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [router]);

  return (
    <Suspense fallback={<div className="text-white text-center p-6">Loading editor...</div>}>
      <EditorWrapper />
    </Suspense>
  );
}
