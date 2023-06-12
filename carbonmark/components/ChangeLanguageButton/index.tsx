import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import Tippy from "@tippyjs/react";
import { activateLocale, loadTranslation, locales } from "lib/i18n";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const ChangeLanguageButton: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const locale = window?.localStorage?.getItem("locale") || "en";
    setLocale(locale);
    selectLocale(locale);
  }, []);

  const selectLocale = async (locale: string) => {
    const messages = await loadTranslation(locale);
    await activateLocale(locale, messages);
    window?.localStorage?.setItem("locale", locale);
    setLocale(locale);
  };

  const handleClickMenuItem = (localeKey: string) => () => {
    selectLocale(localeKey);
    setShowMenu(false);
  };

  console.log("locale", locale);

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
      placement="bottom-start"
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
        <Language fontSize="medium" />
      </button>
    </Tippy>
  );
};
