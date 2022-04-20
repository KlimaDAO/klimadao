import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { IS_PRODUCTION } from "lib/constants";

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

  const labels: { [key: string]: string } = {
    en: "English",
    fr: "Français",
    de: "Deutsch",
    ru: "Русский",
    zh: "中文",
  };

  // enable 'pseudo' locale only for Staging environment
  if (!IS_PRODUCTION) {
    labels["en-pseudo"] = "Pseudo";
  }

  const content = (
    <div>
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
      className={styles.tooltip}
      content={content}
      interactive={true}
      onClickOutside={() => setShowMenu(false)}
      placement="bottom-end"
      visible={showMenu}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={styles.changeLanguageButton}
        aria-label={t({
          id: "shared.change_language",
          message: "Change language",
        })}
      >
        <Language />
      </button>
    </Tippy>
  );
};
