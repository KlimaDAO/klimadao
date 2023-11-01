"use client";

import { Button } from "@mui/material";
import Link from "components/Link";
import { useIsPathnameActive } from "hooks/useIsPathnameActive";
import { FC } from "react";
import { NavItem } from "../NavItems";
import styles from "./styles.module.scss";

interface Props {
  navItem: NavItem;
  key?: string;
}
export const MobileMenuButtonItem: FC<Props> = (props) => {
  const active = useIsPathnameActive(props.navItem.url);
  return (
    <Link href={props.navItem.url}>
      <Button className={styles.button} aria-selected={active}>
        <span>{props.navItem.icon}</span>
        {props.navItem.label}
      </Button>
    </Link>
  );
};
