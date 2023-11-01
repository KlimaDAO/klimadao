"use client";

import { Menu } from "@mui/icons-material";
import { Button, Drawer } from "@mui/material";
import Link from "components/Link";
import { useIsPathnameActive } from "hooks/useIsPathnameActive";
import { FC, useState } from "react";
import { NavItem, navItems } from "../NavItems";
import layoutStyles from "../styles.module.scss";
import styles from "./styles.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}
const MobileMenuButtonItem: FC<Props> = (props) => {
  const active = useIsPathnameActive(props.navItem.url);
  return (
    <Link href={props.navItem.url}>
      <Button className={styles.button} aria-selected={active}>
        {props.navItem.icon}
        {props.navItem.label}
      </Button>
    </Link>
  );
};
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
      <Drawer anchor="bottom" open={showDrawer} onClose={toggleDrawer}>
        <div className={styles.wrapper}>
          {navItems().map((navItem) => (
            <MobileMenuButtonItem key={navItem.url} navItem={navItem} />
          ))}
        </div>
      </Drawer>
    </>
  );
}
