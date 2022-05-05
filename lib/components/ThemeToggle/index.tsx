import React, { FC, useState, useEffect } from "react";
import { cx } from "@emotion/css";
import { ThemeMoonIcon, ThemeSunIcon } from "..";

import * as styles from "./styles";

interface Props {
  className?: string;
}

export const ThemeToggle: FC<Props> = (props) => {
  const [activeTheme, setActiveTheme] = useState(
    document.body.dataset.theme || "theme-light"
  );
  const inactiveTheme =
    activeTheme === "theme-light" ? "theme-dark" : "theme-light";
  const themeIcon =
    activeTheme === "theme-light" ? <ThemeMoonIcon /> : <ThemeSunIcon />;

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
  }, [activeTheme]);

  return (
    <button
      className={cx(styles.buttonToggle, activeTheme, props.className)}
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      {themeIcon}
    </button>
  );
};
