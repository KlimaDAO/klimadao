"use client";

import { t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";
import { locales } from "lib/i18n";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { TopMenuButton } from "./TopMenuButton";

export const ChangeLanguageButton: FC<{ className?: string }> = ({
  className,
}) => {
  const searchParams = useSearchParams();
  let href = usePathname();
  if (`${searchParams}`) {
    href = `${href}?${searchParams}`;
  }

  return (
    <TopMenuButton label={t`Change language`} icon={<Language />}>
      <>
        {Object.keys(locales).map((localeKey) => (
          <Link key={localeKey} locale={localeKey} href={href}>
            {locales[localeKey].label}
          </Link>
        ))}
      </>
    </TopMenuButton>
  );
};
