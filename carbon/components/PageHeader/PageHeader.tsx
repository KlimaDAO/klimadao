import { ExploreMarketplaceButton } from "components/ExploreMarketplaceButton";
import { ChangeLanguageButton } from "components/Layout/ChangeLanguageButton";
import Link from "components/Link";
import { FC } from "react";
import layout from "theme/layout.module.scss";
import { BackButton } from "./BackButton";
import styles from "./styles.module.scss";

export const PageHeader: FC<{
  title: string;
  subheading?: { href: string; label: string };
  backButtonHref?: string;
}> = ({ title, subheading, backButtonHref }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headings}>
        <div>
          <h1 className={styles.title}>
            {backButtonHref && <BackButton href={backButtonHref} />}
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
          <ExploreMarketplaceButton />
        </div>
      </div>
    </div>
  );
};
