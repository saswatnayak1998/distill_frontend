"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DistillHeader } from "../ui";
import { RunButton } from "../ui";

const RecruiterDashboard = () => {
  const router = useRouter();
  const [aiQuery, setAiQuery] = useState("");
  const [showAIInput, setShowAIInput] = useState(false);

  const handleAIQuery = () => {
    // Handle AI query logic here
    console.log("AI Query:", aiQuery);
    setAiQuery("");
    setShowAIInput(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      {/* Floating Ask AI Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex flex-col items-end gap-2">
          {showAIInput && (
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask AI to start test, rank candidates, or analyze data..."
              className="w-96 px-4 py-3 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-teal-400/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
            />
          )}
          <RunButton
            isLoading={false}
            onClick={() => setShowAIInput(!showAIInput)}
            label={showAIInput ? "Close AI" : "Ask AI"}
            gradientFrom="from-purple-500"
            gradientTo="to-teal-600"
            icon="🤖"
            className="shadow-xl"
          />
        </div>
      </div>

      {/* Header */}
      <DistillHeader
        title="Recruiter Dashboard"
        bubbleCount={30}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-6 space-y-12">
          {/* ... (existing Quick Stats and Candidate Pipeline sections remain same) ... */}

          {/* Enhanced AI-Powered Insights Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent">
              Conduct Cheating-Free Tests and Video Interviews along with All in one AI ATS
            </h2>
            
            {/* AI Candidate Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  Smart Candidate Ranking
                </h3>
                <p className="text-gray-300 mb-4">
                  AI-powered ranking based on:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
                  <li>Technical skill proficiency</li>
                  <li>Behavioral pattern analysis</li>
                  <li>Cultural fit prediction</li>
                  <li>Historical performance data</li>
                </ul>
                <RunButton
                  isLoading={false}
                  onClick={() => router.push("/ai-ranking")}
                  label="Generate Ranked List"
                  gradientFrom="from-teal-500"
                  gradientTo="to-purple-600"
                  icon="📊"
                />
              </div>

              {/* Enhanced Cheating Detection */}
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Integrity Monitoring
                </h3>
                
                <div className="space-y-6">
                  {/* Coding Assessment Monitoring */}
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-teal-400">Coding Assessment Protection</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• AI-generated code detection</li>
                      <li>• Plagiarism scanning</li>
                      <li>• Browser activity monitoring</li>
                      <li>• Pattern anomaly detection</li>
                    </ul>
                  </div>

                  {/* Interview Monitoring */}
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-amber-400">Live Interview Analysis</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Script reading detection</li>
                      <li>• Facial recognition analysis</li>
                      <li>• Voice pattern monitoring</li>
                      <li>• Real-time alert system</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <RunButton
                    isLoading={false}
                    onClick={() => router.push("/coding-integrity")}
                    label="Code Reports"
                    gradientFrom="from-red-500"
                    gradientTo="to-amber-600"
                    icon="💻"
                  />
                  <RunButton
                    isLoading={false}
                    onClick={() => router.push("/interview-integrity")}
                    label="Interview Analysis"
                    gradientFrom="from-purple-500"
                    gradientTo="to-pink-600"
                    icon="🎥"
                  />
                </div>
              </div>
            </div>

            {/* AI Test Management */}
            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all">
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Test Orchestrator
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <RunButton
                  isLoading={false}
                  onClick={() => router.push("/create-test")}
                  label="Create Smart Test"
                  gradientFrom="from-blue-500"
                  gradientTo="to-purple-600"
                  icon="🧪"
                />
                <RunButton
                  isLoading={false}
                  onClick={() => router.push("/analyze-results")}
                  label="Analyze Results"
                  gradientFrom="from-green-500"
                  gradientTo="to-cyan-600"
                  icon="🔍"
                />
                <RunButton
                  isLoading={false}
                  onClick={() => router.push("/generate-feedback")}
                  label="Generate Feedback"
                  gradientFrom="from-amber-500"
                  gradientTo="to-orange-600"
                  icon="📝"
                />
              </div>
            </div>
          </section>

          {/* ... (existing footer remains same) ... */}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;