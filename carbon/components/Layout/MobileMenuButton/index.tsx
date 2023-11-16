"use client";

import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer } from "@mui/material";
import { ExploreMarketplaceButton } from "components/ExploreMarketplaceButton";
import { useState } from "react";
import { navItems } from "../NavItems";
import layoutStyles from "../styles.module.scss";
import { MobileMenuButtonItem } from "./MobileMenuButtonItem";
import styles from "./styles.module.scss";

export function MobileMenuButton() {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <>
      <Button onClick={toggleDrawer} className={layoutStyles.topBarButton}>
        {!showDrawer && <MenuIcon />}
        {showDrawer && <ClearIcon />}
      </Button>
      <Drawer anchor="bottom" open={showDrawer} onClick={toggleDrawer}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.links}>
              {navItems().map((navItem) => (
                <MobileMenuButtonItem key={navItem.url} navItem={navItem} />
              ))}
            </div>
            <ExploreMarketplaceButton
              className={styles.exploreMarketplaceButton}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
