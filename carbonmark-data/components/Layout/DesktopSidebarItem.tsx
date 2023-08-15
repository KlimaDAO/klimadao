import { FC } from "react";
import { DesktopSidebarItemIcon } from "./DesktopSidebarItemIcon";
import { NavItem } from "./NavItems";
import * as styles from "./styles";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const DesktopSidebarItem: FC<Props> = ({ navItem }) => {
  return (
    <a className={styles.desktopSidebarItem} href={navItem.url}>
      <DesktopSidebarItemIcon>{navItem.iconPath}</DesktopSidebarItemIcon>
      {navItem.label}
    </a>
  );
};
