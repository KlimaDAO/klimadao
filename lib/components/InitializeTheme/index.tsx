import React from "react";

/**
 * Prevent flash-of-light-mode by checking for previous theme and setting body.dataset.theme
 * Using an inline-script and rendering in pages/_document, it runs before Next does js hydration, before any of the React life-cycles.
 * It does not run on the server.
 * */
export const InitializeTheme = () => {
  const __html = `
      function getUserPreference() {
        const prevTheme = window.localStorage.getItem("theme");
        if (prevTheme === "theme-dark" || window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "theme-dark";
        }
        return "theme-light";
      }
      document.body.dataset.theme = getUserPreference();
    `;
  return <script dangerouslySetInnerHTML={{ __html }} />;
};
