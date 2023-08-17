import { FC } from "react";
import * as styles from "./styles";

import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { MobileMenu } from "./MobileMenu";

export const MobileHeader: FC = () => {
  return (
    <>
      <div className={styles.mobileHeader}>
        <CarbonmarkDataLogo></CarbonmarkDataLogo>
        <div className={styles.mobileNavButtons}>
          <ChangeLanguageButton></ChangeLanguageButton>
          <MobileMenu></MobileMenu>
        </div>
      </div>
    </>
  );
};
