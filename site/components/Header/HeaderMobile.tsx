import React, { FC, useState } from "react";
import * as styles from "./styles";

import { LogoWithClaim } from "@klimadao/lib/components";
import Link from "next/link";
import { ToggleNavButton } from "../Navigation/ToggleNavButton";
import { NavMobile } from "../Navigation/NavMobile";

interface Props {
  buttons?: JSX.Element[];
}

export const HeaderMobile: FC<Props> = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div
      className={
        isToggled ? styles.headerMobileWrap_toggled : styles.headerMobileWrap
      }
    >
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/"}>
            <a>
              <LogoWithClaim />
            </a>
          </Link>
        </div>
        {props.buttons && (
          <div className={styles.navMain_Buttons}>{props.buttons}</div>
        )}
        <ToggleNavButton
          isToggled={isToggled}
          onClick={() => setIsToggled(!isToggled)}
        />
      </header>
      <NavMobile isToggled={isToggled}>{props.children}</NavMobile>
    </div>
  );
};
