import { FC, ReactNode, useEffect, useState } from "react";
import * as styles from "./styles";

import { CarbonmarkLogo } from "components/Logos/CarbonmarkLogo";
import Link from "next/link";
import { NavMobile } from "../Navigation/NavMobile";
import { ToggleNavButton } from "../Navigation/ToggleNavButton";

interface Props {
  buttons?: JSX.Element[];
  children: ReactNode;
  transparent?: boolean;
}

export const HeaderMobile: FC<Props> = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    isToggled
      ? document.body.classList.add("scroll-lock")
      : document.body.classList.remove("scroll-lock");

    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [isToggled]);

  return (
    <div
      className={
        isToggled ? styles.headerMobileWrap_toggled : styles.headerMobileWrap
      }
    >
      <header
        className={
          props.transparent
            ? styles.headerTransparentMobile
            : styles.headerMobile
        }
      >
        <div className={styles.mainLogoMobile}>
          <Link href={"/"}>
            <CarbonmarkLogo />
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
