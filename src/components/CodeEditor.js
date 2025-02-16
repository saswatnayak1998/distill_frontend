"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { EditorComponent } from "./EditorComponent";
import { LanguageSelect } from "../components/LanguageSelect";
import { useRunCode } from "../hooks/useRunCode";
import { useCopyPasteLogger } from "../hooks/useCopyPasteLogger";
import { Header, OutputPanel, RunButton } from "./ui";



export default function CodeEditor() {
    
  const [code, setCode] = useState("print('Hello, World!')");
  const [language, setLanguage] = useState("python");
  const [question, setQuestion] = useState({
    id: null,
    title: "",
    description: "",
    referenceSolution: "",
    maxScore: 0,
  });
  const [score, setScore] = useState(0);

  const { output, isLoading, runCode, runTest, testResults, isTesting } = useRunCode();
  const { copyPasteLogs, logCopyPasteAction, resetLogs } = useCopyPasteLogger();

  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId");
  const candidateId = searchParams.get("candidateId");

  useEffect(() => {
    if (!questionId) {
      console.error("❌ Missing questionId in URL parameters.");
      return;
    }

    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(`https://backenddistill-production.up.railway.app/get-question/${questionId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch question details: ${response.statusText}`);
        }

        const data = await response.json();
        setQuestion({
          id: data.id,
          title: data.question.substring(0, 50),
          description: data.question,
          referenceSolution: data.reference_solution || "print('Hello, World!')",
          maxScore: data.max_score,
        });

        setCode(data.reference_solution || "print('Hello, World!')");
      } catch (error) {
        console.error("❌ Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);


  const handleSubmit = async () => {
    console.log("📝 Submitting with:", {
      language,
      code,
      questionId: question.id,
      candidateId,
      copyPasteLogs,
    });

    try {
      if (!language || !code || !question.id || !candidateId) {
        throw new Error("⚠️ Missing required fields for submission.");
      }

      // ✅ Run tests and save logs in DB
      const result = await runTest(language, code, question.id, candidateId, copyPasteLogs);
      setScore(result.score);

      alert("✅ Code submitted successfully! Your score has been recorded.");
      resetLogs();
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-space-900 to-gray-900 text-white">
      <Header handleLogout={() => router.push("/")} />

      <div className="p-6 space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-teal-400">{question.title || "Untitled Question"}</h2>
          <p className="text-gray-300 mt-2 whitespace-pre-line">{question.description || "No description available."}</p>
        </div>
      </div>

      <PanelGroup direction="horizontal" className="flex-grow h-full group">
        <Panel defaultSize={60} minSize={40}>
          <div className="h-full flex flex-col p-6 space-y-6">
            <LanguageSelect language={language} setLanguage={setLanguage} />
            <div className="flex-grow rounded-xl overflow-hidden border border-gray-700/50 shadow-xl">
              <EditorComponent code={code} setCode={setCode} language={language} logCopyPasteAction={logCopyPasteAction} />
            </div>
            <div className="flex justify-end space-x-4">
              <RunButton isLoading={isLoading} onClick={() => runCode(language, code)} label="Run Code" gradientFrom="from-teal-500" gradientTo="to-purple-600" icon="▶" />
              <RunButton isLoading={false} onClick={handleSubmit} label="Submit Code" gradientFrom="from-blue-500" gradientTo="to-green-600" icon="📤" />
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="w-2 bg-gray-700" />
        <Panel defaultSize={40} minSize={30}>
          <OutputPanel output={output} isLoading={isLoading} copyPasteLogs={copyPasteLogs} testResults={testResults} isTesting={isTesting} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
