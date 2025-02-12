import { useEffect, useState, useCallback } from "react";

export const useCopyPasteLogger = () => {
  const [copyPasteLogs, setCopyPasteLogs] = useState([]);

  // ✅ Function to log copy-paste actions
  const logCopyPasteAction = useCallback((action, text) => {
    console.log(`${action} action logged:`, text);

    setCopyPasteLogs((prevLogs) => [
      ...prevLogs,
      {
        action,
        text: text.length > 100 ? `${text.substring(0, 100)}...` : text,
        timestamp: new Date().toLocaleString(),
      },
    ]);
  }, []);

  // ✅ Function to reset logs after submission
  const resetLogs = () => {
    console.log("🗑️ Resetting copy-paste logs...");
    setCopyPasteLogs([]); // Clear logs
  };

  // ✅ Ensure logs are saved when the session ends
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveLogsToFile(copyPasteLogs);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [copyPasteLogs]);

  useEffect(() => {
    const handleCopy = (e) => {
      const selection = window.getSelection()?.toString();
      if (selection) logCopyPasteAction("Copy", selection);
    };

    const handlePaste = (e) => {
      const pastedText = e.clipboardData?.getData("text/plain") || "";
      if (pastedText) logCopyPasteAction("Paste", pastedText);
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
    };
  }, [logCopyPasteAction]);

  return { copyPasteLogs, logCopyPasteAction, resetLogs };
};
