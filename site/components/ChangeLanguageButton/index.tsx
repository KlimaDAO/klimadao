import React, { FC, useState } from "react";
import Tippy from "@tippyjs/react";
import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
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
        aria-label={t`Change language`}
      >
        <Language />
      </button>
    </Tippy>
  );
};
