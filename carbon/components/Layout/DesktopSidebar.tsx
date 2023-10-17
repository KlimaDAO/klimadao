import { FC } from "react";
import styles from "./style.module.scss";

import { CarbonmarkDataLogo } from "components/Graphics/CarbonmarkDataLogo";
import Link from "components/Link";
import { DesktopSidebarItem } from "./DesktopSidebarItem";
import { navItems } from "./NavItems";

export const DesktopSidebar: FC = () => {
  return (
    <div className={styles.desktopSidebar}>
      <Link className={styles.desktopSidebarBrand} href={"/"}>
        <CarbonmarkDataLogo width={180} height={30} />
      </Link>
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
  );
};
