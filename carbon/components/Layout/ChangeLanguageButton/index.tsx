"use client";

import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import { locales } from "lib/i18n";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { useSearchParams } from "next/navigation";
import layout from "theme/layout.module.scss";
import layoutStyles from "../styles.module.scss";
import styles from "./styles.module.scss";

export function ChangeLanguageButton() {
  const searchParams = useSearchParams();
  let href = usePathname();
  if (`${searchParams}`) {
    href = `${href}?${searchParams}`;
  }
  /* FIXME: Hide the change language button until translations are done */
  return (
    <Tippy
      className={styles.topBarTooltip}
      content={
        <div aria-describedby="tooltip-content">
          <>
            {Object.keys(locales).map((localeKey) => (
              <Link key={localeKey} locale={localeKey} href={href}>
                {locales[localeKey].label}
              </Link>
            ))}
          </>
        </div>
      }
      interactive={true}
      placement="bottom-start"
      trigger="click"
    >
      <Button
        className={`${layoutStyles.topBarButton} ${layout.hidden}`}
        aria-label={t`Change language`}
      >
        <Language />
      </Button>
    </Tippy>
  );
}
