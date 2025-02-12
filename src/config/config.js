export const API_ENDPOINTS = {
    RUN_CODE: "http://localhost:8080/run",
  };
  
  export const LANGUAGES = [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
  ];
  
  export const DEFAULT_CODE = {
    python: "print('Hello, World!')",
    javascript: "console.log('Hello World');",
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`
  };