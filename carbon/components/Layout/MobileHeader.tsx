import { FC } from "react";
import styles from "./style.module.scss";

import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { MobileMenu } from "./MobileMenu";

export const MobileHeader: FC = () => {
  return (
    <>
      <div className={styles.mobileHeader}>
        <CarbonmarkDataLogo width={116} height={20} />
        <div className={styles.mobileNavButtons}>
          <ChangeLanguageButton></ChangeLanguageButton>
          <MobileMenu></MobileMenu>
        </div>
      </div>
    </>
  );
};
