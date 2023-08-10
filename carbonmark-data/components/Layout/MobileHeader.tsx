import { FC } from "react";
import * as styles from "./styles";

import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { useRouter } from "next/router";

export const MobileHeader: FC = () => {
    const { pathname } = useRouter();
    return (<>
        <div className={styles.mobileHeader}>
            <CarbonmarkDataLogo></CarbonmarkDataLogo>
            <div>
                <ChangeLanguageButton></ChangeLanguageButton>
            </div>
        </div >
    </>
    );
};
