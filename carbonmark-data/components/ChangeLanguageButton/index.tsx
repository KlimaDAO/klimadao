import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import Tippy from "@tippyjs/react";
import { locales } from "lib/i18n";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import * as styles from "./styles";

export const ChangeLanguageButton: FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { pathname, asPath, query, locale } = router;

  const content = (
    <div>
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
      placement="bottom-start"
      visible={showMenu}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={styles.changeLanguageButton}
        aria-label={t`Change language`}
      >
        <Language fontSize="medium" />
      </button>
    </Tippy>
  );
};
