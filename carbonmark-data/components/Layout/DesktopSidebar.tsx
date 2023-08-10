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

export const DesktopSidebar: FC = () => {
    const { pathname } = useRouter();
    return (<>
        <div className={styles.desktopHeader}>
            <CarbonmarkDataLogo></CarbonmarkDataLogo>
            <div aria-describedby="title">Carbon Dashboard</div>
            <div aria-describedby="links">
                <SidebarItem url="/" icon={OverviewIcon}>Overview</SidebarItem>
                <SidebarItem url="/off_vs_on_chain" icon={OffVsOnIcon}>Off vs On-Chain</SidebarItem>
                <SidebarItem url="/supply" icon={SupplyIcon}>Supply</SidebarItem>
                <SidebarItem url="/retirement_trends" icon={RetirementTrendsIcon}>Retirement Trends</SidebarItem>
                <SidebarItem url="/token_details" icon={TokenDetailsIcon}>Token Details</SidebarItem>

                <hr />
            </div>

        </div >
    </>
    );
};
