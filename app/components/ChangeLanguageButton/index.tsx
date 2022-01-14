import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";

import { activate, locales } from "lib/i18n";
import { selectAppState } from "state/selectors";
import { useAppDispatch } from "state";
import { setAppState } from "state/app";

import * as styles from "./styles";

/**
 * Temporary demo component until we have one from design
 */
export const ChangeLanguageButton: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { locale } = useSelector(selectAppState);
  const dispatch = useAppDispatch();

  const selectLocale = async (locale: string) => {
    activate(locale);
    dispatch(setAppState({ locale }));
  };

  const handleClickMenuItem = (localeKey: string) => () => {
    selectLocale(localeKey);
    setShowMenu(false);
  };

  const labels = {
    en: "English",
    fr: "Français",
    pseudo: "Pseudo",
  };

  const content = (
    <div className={styles.menuItemContainer}>
      {Object.keys(locales).map((localeKey) => (
        <button
          key={localeKey}
          data-active={locale == localeKey ? "true" : "false"}
          onClick={handleClickMenuItem(localeKey)}
          className={styles.menuItem}
        >
          {labels[localeKey as keyof typeof labels]}
        </button>
      ))}
    </div>
  );

  return (
    <Tippy
      content={content}
      placement="bottom-end"
      visible={showMenu}
      interactive
      className={styles.tooltip}
    >
      <button
        onClick={() => setShowMenu((s) => !s)}
        className={styles.changeLanguageButton}
        aria-label={t`Change language`}
      >
        <Language fontSize="large" />
      </button>
    </Tippy>
  );
};
