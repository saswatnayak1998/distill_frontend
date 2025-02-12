// EditorComponent.js
import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

export const EditorComponent = ({ code, setCode, language, logCopyPasteAction }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handlePaste = async (event) => {
      console.log('Global paste event triggered');
      try {
        const pastedText = await navigator.clipboard.readText();
        console.log('Clipboard API paste:', pastedText);
        logCopyPasteAction("Paste", pastedText);
      } catch (error) {
        console.log('Clipboard API error, using fallback');
        const pastedText = event.clipboardData?.getData('text/plain') || '';
        console.log('Fallback paste:', pastedText);
        logCopyPasteAction("Paste", pastedText);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('paste', handlePaste);

    return () => container?.removeEventListener('paste', handlePaste);
  }, [logCopyPasteAction]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    console.log('Editor mounted');

    // Monaco-specific paste handling
    const disposable = editor.onDidPaste(({ range }) => {
      console.log('Monaco paste event detected');
      try {
        const model = editor.getModel();
        const pastedText = model.getValueInRange(range);
        console.log('Monaco pasted text:', pastedText);
        logCopyPasteAction("Paste", pastedText);
      } catch (error) {
        console.error('Monaco paste error:', error);
      }
    });

    return () => {
      console.log('Cleaning up Monaco listeners');
      disposable.dispose();
    };
  };

  return (
    <div ref={containerRef} className="h-full">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={setCode}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  );
};