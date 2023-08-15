import { FC } from "react";
import * as styles from "./styles";

import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";

export const MobileHeader: FC = () => {
  return (
    <>
      <div className={styles.mobileHeader}>
        <CarbonmarkDataLogo></CarbonmarkDataLogo>
        <div>
          <ChangeLanguageButton></ChangeLanguageButton>
        </div>
      </div>
    </>
  );
};
