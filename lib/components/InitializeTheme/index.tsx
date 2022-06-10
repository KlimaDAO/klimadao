import React, { FC } from "react";
import { THEME_DARK, THEME_LIGHT } from "@klimadao/lib/theme/constants";
import { Themes } from "@klimadao/lib/types/theme";

interface Props {
  fixedThemeName?: Themes;
}

/**
 * Prevent flash-of-light-mode by checking for previous theme and setting body.dataset.theme
 * Using an inline-script and rendering in pages/_document, it runs before Next does js hydration, before any of the React life-cycles.
 * It does not run on the server.
 * */
export const InitializeTheme: FC<Props> = ({ fixedThemeName }) => {
  const __html = `
      function getUserPreference() {
        if (!!"${fixedThemeName}") return "${fixedThemeName}";
        const prevTheme = window.localStorage.getItem("theme");
        if (prevTheme === "${THEME_DARK}" || prevTheme === "${THEME_LIGHT}") {
          return prevTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "${THEME_DARK}" : "${THEME_LIGHT}";
      }
      document.body.dataset.theme = getUserPreference();
    `;
  return <script dangerouslySetInnerHTML={{ __html }} />;
};
