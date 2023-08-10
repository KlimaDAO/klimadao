import { FC } from "react";
import * as styles from "./styles";

import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { OffVsOnIcon } from "components/Graphics/OffVsOnIcon";
import { OverviewIcon } from "components/Graphics/OverviewIcon";
import { RetirementTrendsIcon } from "components/Graphics/RetirementTrendsIcon";
import { SupplyIcon } from "components/Graphics/SupplyIcon";
import { TokenDetailsIcon } from "components/Graphics/TokenDetailsIcon";
import { useRouter } from "next/router";
import { SidebarItem } from "./SidebarItem";

export const DesktopHeader: FC = () => {
    const { pathname } = useRouter();
    return (<>
        <div className={styles.desktopHeader}>
            <CarbonmarkDataLogo></CarbonmarkDataLogo>
            <div aria-describedby="title">Carbon Dashboard</div>
            <div aria-describedby="links">
                <SidebarItem icon={OverviewIcon}>Overview</SidebarItem>
                <SidebarItem icon={OffVsOnIcon}>Off vs On-Chain</SidebarItem>
                <SidebarItem icon={SupplyIcon}>Supply</SidebarItem>
                <SidebarItem icon={RetirementTrendsIcon}>Retirement Trends</SidebarItem>
                <SidebarItem icon={TokenDetailsIcon}>Token Details</SidebarItem>

                <hr />
            </div>

        </div >
    </>
    );
};
