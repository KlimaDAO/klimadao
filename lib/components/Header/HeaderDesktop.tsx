import React, { FC } from "react";
import * as styles from "./styles";

import { LogoWithClaim } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

interface Props {
  children: JSX.Element[];
  buttons?: JSX.Element[];
}

export const HeaderDesktop: FC<Props> = (props) => {
  return (
    <header className={styles.headerDesktop}>
      <nav className={styles.menuDesktop}>
        <div className={styles.logo_Desktop}>
          <a href={urls.home}>
            <LogoWithClaim />
          </a>
        </div>
        <div className={styles.navMain_Desktop}>{props.children}</div>
        {props.buttons && (
          <div className={styles.navMain_Buttons}>{props.buttons}</div>
        )}
      </nav>
    </header>
  );
};
