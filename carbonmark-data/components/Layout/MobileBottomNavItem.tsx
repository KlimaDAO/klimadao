"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { NavItem } from "./NavItems";
import * as styles from "./styles";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const MobileBottomNavItem: FC<Props> = ({ navItem }) => {
  const pathname = usePathname();
  const active = pathname == navItem.url;
  return (
    <div
      aria-describedby="button"
      className={styles.mobileBottomNavItem}
      aria-selected={active}
    >
      <a href={navItem.url}>{navItem.icon}</a>
    </div>
  );
};
