"use client";
import Link from "components/Link";
import { useIsPathnameActive } from "hooks/useIsPathnameActive";
import { FC } from "react";
import { NavItem } from "../NavItems";
import styles from "./styles.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const DesktopSidebarItem: FC<Props> = ({ navItem }) => {
  const active = useIsPathnameActive(navItem);

  return (
    <Link
      className={styles.desktopSidebarItem}
      href={navItem.url}
      aria-selected={active}
    >
      <span className={styles.desktopSidebarIcon}>{navItem.icon}</span>
      {navItem.label}
    </Link>
  );
};
