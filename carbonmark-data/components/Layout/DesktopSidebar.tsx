import { FC } from "react";
import * as styles from "./styles";

import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { useRouter } from "next/router";
import { DesktopSidebarItem } from "./DesktopSidebarItem";
import { navItems } from "./NavItems";

export const DesktopSidebar: FC = () => {
    const { pathname } = useRouter();
    return (<>
        <div className={styles.desktopSidebar}>
            <CarbonmarkDataLogo></CarbonmarkDataLogo>
            <div aria-describedby="title">Carbon Dashboard</div>
            <div aria-describedby="links">
                {navItems.map(navItem =>
                    <DesktopSidebarItem navItem={navItem} key={navItem.url}></DesktopSidebarItem>
                )}
                < hr />
            </div>

        </div >
    </>
    );
};
