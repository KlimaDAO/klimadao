import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { ButtonWithLink } from "components/ButtonWithLink";
import { ChangeLanguageButton } from "components/Layout/ChangeLanguageButton";
import Link from "components/Link";
import { FC } from "react";
import layout from "theme/layout.module.scss";
import BackButton from "./BackButton";
import styles from "./styles.module.scss";

export const PageHeader: FC<{
  title: string;
  subheading?: { href: string; label: string };
  showBackButton?: boolean;
}> = ({ title, subheading, showBackButton }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headings}>
        <div>
          <h1 className={styles.title}>
            {showBackButton && <BackButton />}
            {title}
          </h1>
        </div>
        {subheading && (
          <Link href={subheading.href} className={styles.subheading}>
            {subheading.label}
          </Link>
        )}
      </div>

      <div className={layout.desktopOnly}>
        <div className={styles.buttons}>
          <ChangeLanguageButton />
          <ButtonWithLink
            href={urls.marketplace}
            label={t`Explore Marketplace`}
          />
        </div>
      </div>
    </div>
  );
};
