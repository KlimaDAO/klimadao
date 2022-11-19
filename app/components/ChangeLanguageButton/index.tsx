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

export const ChangeLanguageButton: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { locale } = useSelector(selectAppState);
  const dispatch = useAppDispatch();

  const selectLocale = async (locale: string) => {
    await activate(locale);
    dispatch(setAppState({ locale }));
  };

  const handleClickMenuItem = (localeKey: string) => () => {
    selectLocale(localeKey);
    setShowMenu(false);
  };

  const content = (
    <div>
      {Object.keys(locales).map((localeKey) => (
        <button
          key={localeKey}
          data-active={locale == localeKey ? "true" : "false"}
          onClick={handleClickMenuItem(localeKey)}
          className={styles.menuItem}
        >
          {locales[localeKey].label}
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
