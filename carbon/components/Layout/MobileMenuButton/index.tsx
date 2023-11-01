"use client";

import { Menu } from "@mui/icons-material";
import { Button, Drawer } from "@mui/material";
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
        <Menu />
      </Button>
      <Drawer
        anchor="bottom"
        open={showDrawer}
        onClose={toggleDrawer}
        onClick={toggleDrawer}
      >
        <div className={styles.wrapper}>
          {navItems().map((navItem) => (
            <MobileMenuButtonItem key={navItem.url} navItem={navItem} />
          ))}
        </div>
      </Drawer>
    </>
  );
}
