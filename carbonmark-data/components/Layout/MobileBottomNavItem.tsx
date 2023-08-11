import { useRouter } from "next/router";
import { FC } from "react";
import { MobileBottomNavItemIcon } from "./MobileBottomNavItemIcon";
import { NavItem } from "./NavItems";
import * as styles from "./styles";

interface Props {
    navItem: NavItem,
    key?: string
}

export const MobileBottomNavItem: FC<Props> = ({ navItem }) => {
    const { pathname } = useRouter();
    const active = pathname == navItem.url;
    const iconPath = active ? navItem.activeIconPath : navItem.iconPath
    return (
        <div aria-describedby="button" className={styles.mobileBottomNavItem} aria-selected={active}>
            <a href={navItem.url}>
                <MobileBottomNavItemIcon active={active}>{iconPath()}</MobileBottomNavItemIcon>
            </a>
        </div>

    );
};
