import React, { FC } from "react";
import * as styles from "./styles";
import { Link } from "../types";

import { LogoWithClaim } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

interface Props {
  buttons?: JSX.Element[];
  link?: Link;
  href?: string;
}

export const HeaderDesktop: FC<Props> = (props) => {
  return (
    <header className={styles.headerDesktop}>
      <nav className={styles.menuDesktop}>
        <div className={styles.logo_Desktop}>
          {props.link && (
            <props.link href={"/"}>
              <a>
                <LogoWithClaim />
              </a>
            </props.link>
          )}
          {!props.link && (
            <a href={urls.home}>
              <LogoWithClaim />
            </a>
          )}
        </div>
        <div className={styles.navMain_Desktop}>{props.children}</div>
        {props.buttons && (
          <div className={styles.navMain_Buttons}>{props.buttons}</div>
        )}
      </nav>
    </header>
  );
};
