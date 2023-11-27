import { FC } from "react";
import styles from "./styles.module.scss";

import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { ChangeLanguageButton } from "components/Layout/ChangeLanguageButton";
import Link from "components/Link";
import { MobileMenuButton } from "../MobileMenuButton";

export const MobileHeader: FC = () => {
  return (
    <>
      <div className={styles.mobileHeader}>
        <Link href={"/"}>
          <CarbonmarkDataLogo width={116} height={20} />
        </Link>
        <div className={styles.mobileNavButtons}>
          <ChangeLanguageButton />
          <MobileMenuButton />
        </div>
      </div>
    </>
  );
};
