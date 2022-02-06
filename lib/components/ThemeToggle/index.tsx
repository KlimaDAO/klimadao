import React, { FC, useState, useEffect } from "react";
import { cx } from "@emotion/css";
import { ThemeMoon } from "../Icons/ThemeMoon";
import * as styles from "./styles";

export const ThemeToggle: FC = () => {
  const [activeTheme, setActiveTheme] = useState(
    document.body.dataset.theme || "theme-light"
  );
  const inactiveTheme =
    activeTheme === "theme-light" ? "theme-dark" : "theme-light";

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  return (
    <button
      className={cx(styles.buttonToggle, activeTheme)}
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <ThemeMoon />
    </button>
  );
};
