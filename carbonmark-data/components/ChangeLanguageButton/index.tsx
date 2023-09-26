"use client";

import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { Button } from "@mui/material";
import Tippy from "@tippyjs/react";
import { locales } from "lib/i18n";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import styles from "./styles.module.scss";

export const ChangeLanguageButton: FC<{ className?: string }> = ({
  className,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const searchParams = useSearchParams();
  let href = usePathname();
  if (`${searchParams}`) {
    href = `${href}?${searchParams}`;
  }

  return (
    <Tippy
      className={styles.tooltip}
      content={
        <div aria-describedby="tooltip-content">
          {Object.keys(locales).map((localeKey) => (
            <Link key={localeKey} locale={localeKey} href={href}>
              <Button>{locales[localeKey].label}</Button>
            </Link>
          ))}
        </div>
      }
      interactive={true}
      placement="bottom-start"
      visible={showTooltip}
    >
      <Button
        className={`${styles.changeLanguageButton} ${className}`}
        aria-label={t`Change language`}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Language />
      </Button>
    </Tippy>
  );
};
