import React, { FC, useState } from "react";
import Tippy from "@tippyjs/react";
import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { IS_PRODUCTION } from "lib/constants";
import { locales } from "lib/i18n";

import * as styles from "./styles";
import { useRouter } from "next/router";

/**
 * Temporary demo component until we have one from design
 */
export const ChangeLanguageButton: FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const labels: { [key: string]: string } = {
    en: "English",
    fr: "Français",
    de: "Deutsch",
    ru: "Русский",
    "zh-CN": "中文",
    es: "Español",
  };

  // enable 'pseudo' locale only for Staging environment
  if (!IS_PRODUCTION) {
    labels["ko"] = "한국어";
    labels["en-pseudo"] = "Pseudo";
  }

  const content = (
    <div className={styles.menuItemContainer}>
      {Object.keys(locales).map((localeKey) => (
        <button
          key={localeKey}
          type="button"
          data-active={locale == localeKey ? "true" : "false"}
          className={styles.menuItem}
          onClick={() => {
            router.push({ pathname, query }, asPath, { locale: localeKey });
          }}
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
        aria-label={t`Change language`}
      >
        <Language />
      </button>
    </Tippy>
  );
};
