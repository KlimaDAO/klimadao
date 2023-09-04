import { usePathname } from "next/navigation";
import { FC } from "react";
import { NavItem } from "./NavItems";
import styles from "./style.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}

export const MobileBottomNavItem: FC<Props> = ({ navItem }) => {
  const pathname = usePathname();
  const active = pathname == navItem.url;
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
