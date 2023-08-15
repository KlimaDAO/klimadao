import { FC } from "react";
import { navItems } from "./NavItems";
import * as styles from "./styles";


import { MobileBottomNavItem } from "./MobileBottomNavItem";

export const MobileBottomNav: FC = () => {
    return (<>
        <div className={styles.mobileBottomNav}>
            {navItems().map(navItem =>
                <MobileBottomNavItem navItem={navItem} key={navItem.url}></MobileBottomNavItem>
            )}
        </div >
    </>
    );
};
