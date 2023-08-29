import { FC } from "react";
import styles from "./style.module.scss";

import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import { DesktopSidebarItem } from "./DesktopSidebarItem";
import { navItems } from "./NavItems";

export const DesktopSidebar: FC = () => {
  return (
    <>
      <div className={styles.desktopSidebar}>
        <CarbonmarkDataLogo width={180} height={30} />
        <div aria-describedby="title">Carbon Dashboard</div>
        <div aria-describedby="links">
          {navItems().map((navItem) => (
            <DesktopSidebarItem
              navItem={navItem}
              key={navItem.url}
            ></DesktopSidebarItem>
          ))}
        </div>
      </div>
    </>
  );
};
