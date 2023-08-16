import { FC } from "react";
import { NavItem } from "./NavItems";
import * as styles from "./styles";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const DesktopSidebarItem: FC<Props> = ({ navItem }) => {
  return (
    <a className={styles.desktopSidebarItem} href={navItem.url}>
      <span className={styles.desktopSidebarIcon}>{navItem.icon}</span>
      {navItem.label}
    </a>
  );
};
