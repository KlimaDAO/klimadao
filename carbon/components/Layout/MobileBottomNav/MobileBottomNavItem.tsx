"use client";
import { useIsPathnameActive } from "hooks/useIsPathnameActive";
import { FC } from "react";
import { NavItem } from "../NavItems";
import styles from "./styles.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const MobileBottomNavItem: FC<Props> = ({ navItem }) => {
  const active = useIsPathnameActive(navItem);

  return (
    <a
      aria-describedby="button"
      className={styles.mobileBottomNavItem}
      aria-selected={active}
      href={navItem.url}
    >
      {navItem.icon}
    </a>
  );
};
