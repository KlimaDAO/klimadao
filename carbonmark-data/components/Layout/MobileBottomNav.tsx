import { FC } from "react";
import { navItems } from "./NavItems";
import styles from "./style.module.scss";

import { MobileBottomNavItem } from "./MobileBottomNavItem";

export const MobileBottomNav: FC = () => {
  return (
    <>
      <div className={styles.mobileBottomNav}>
        {navItems().map((navItem) => (
          <MobileBottomNavItem
            navItem={navItem}
            key={navItem.url}
          ></MobileBottomNavItem>
        ))}
      </div>
    </>
  );
};
