import { FC, ReactNode, useEffect, useState } from "react";
import * as styles from "./styles";

import { LogoWithClaim } from "@klimadao/lib/components";
import Link from "next/link";
import { NavMobile } from "../Navigation/NavMobile";
import { ToggleNavButton } from "../Navigation/ToggleNavButton";

interface Props {
  buttons?: JSX.Element[];
  children: ReactNode;
}

export const HeaderMobile: FC<Props> = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    isToggled
      ? document.body.classList.add("scrollLock")
      : document.body.classList.remove("scrollLock");
  }, [isToggled]);

  return (
    <div
      className={
        isToggled ? styles.headerMobileWrap_toggled : styles.headerMobileWrap
      }
    >
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/"}>
            <LogoWithClaim />
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
