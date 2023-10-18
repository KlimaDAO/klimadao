import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { Button } from "@mui/material";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
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
          <Link href={urls.carbonmark}>
            <Button className={styles.exploreButton}>
              {t`Explore Marketplace`}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
