import Link from "next/link";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

import { LogoWithClaim } from "@klimadao/lib/components";
import { PageName } from "../Navigation";

interface Props {
  buttons?: JSX.Element[];
  href?: string;
  activePage: PageName;
  transparent?: boolean;
  children: ReactNode;
}

export const HeaderDesktop: FC<Props> = (props) => {
  return (
    <header
      className={
        props.transparent
          ? styles.headerTransparentDesktop
          : styles.headerDesktop
      }
    >
      <nav className={styles.menuDesktop}>
        <div>
          <Link href={"/"}>
            <LogoWithClaim />
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
