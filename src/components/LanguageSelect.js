"use client";
import { LANGUAGES } from "../config/config";

export const LanguageSelect = ({ language, setLanguage }) => {
  // Fallback for empty LANGUAGES or undefined language
  const fallbackLanguage = LANGUAGES[0]?.value || "";

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="language-select"
        className="font-medium text-gray-700 dark:text-gray-300"
      >
        Language:
      </label>
      <select
        id="language-select"
        className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        value={language || fallbackLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select programming language" // Accessibility enhancement
      >
        {LANGUAGES.length > 0 ? (
          LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No languages available
          </option>
        )}
      </select>
    </div>
  );
};