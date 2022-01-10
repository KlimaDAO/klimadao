import React, { FC, useState } from "react";
import * as styles from "./styles";

import {
  LogoWithClaim,
  ToggleNavButton,
  NavMobile,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

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
        <a href={urls.home}>
          <LogoWithClaim />
        </a>
        <ToggleNavButton
          isToggled={isToggled}
          onClick={() => setIsToggled((isToggled) => !isToggled)}
        />
      </header>
      <NavMobile isToggled={isToggled}>{props.children}</NavMobile>
    </div>
  );
};
