import React, { FC, useState, useEffect } from "react";
import { cx } from "@emotion/css";
import { ThemeMoonIcon, ThemeSunIcon } from "..";
import { THEME_DARK, THEME_LIGHT } from "@klimadao/lib/theme/constants";

import * as styles from "./styles";

interface Props {
  className?: string;
}

export const ThemeToggle: FC<Props> = (props) => {
  const [activeTheme, setActiveTheme] = useState(
    window.localStorage.getItem("theme") || THEME_LIGHT
  );
  const inactiveTheme = activeTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
  const themeIcon =
    activeTheme === THEME_LIGHT ? <ThemeMoonIcon /> : <ThemeSunIcon />;

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
