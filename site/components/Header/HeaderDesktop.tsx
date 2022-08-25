import React, { FC } from "react";
import * as styles from "./styles";
import Link from "next/link";

import { LogoWithClaim } from "@klimadao/lib/components";
import { PageName } from "../Navigation";
interface Props {
  buttons?: JSX.Element[];
  href?: string;
  activePage: PageName;
}

export const HeaderDesktop: FC<Props> = (props) => {
  return (
    <header
      className={
        props.activePage === "Infinity"
          ? styles.headerInfinityDesktop
          : styles.headerDesktop
      }
    >
      <nav className={styles.menuDesktop}>
        <div>
          <Link href={"/"}>
            <a>
              <LogoWithClaim />
            </a>
          </Link>
        </div>
        <div className={styles.navMain_Desktop}>{props.children}</div>
        {props.buttons && (
          <div className={styles.navMain_Buttons}>{props.buttons}</div>
        )}
      </nav>
    </header>
  );
};
