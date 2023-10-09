"use client";

import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import Link from "components/Link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";

export const PageHeader: FC<{
  title: string;
  subheading?: { href: string; label: string };
  showBackButton?: boolean;
}> = ({ title, subheading, showBackButton }) => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.headings}>
        <div>
          <h1 className={styles.title}>
            {showBackButton && (
              <span onClick={() => router.back()} role="button">
                <KeyboardArrowLeft />
              </span>
            )}
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
          <ChangeLanguageButton className={styles.changeLanguageButton} />
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
