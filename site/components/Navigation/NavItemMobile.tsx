import React, { FC, useState } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";
import Link from "next/link";
import { ButtonPrimary } from "@klimadao/lib/components";
import { NavItemMobileID } from "./index";
interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  id?: NavItemMobileID;
  url?: string;
  subMenu?: JSX.Element[];
  active?: boolean;
}

export const NavItemMobile: FC<Props> = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={cx(styles.navMain_MobileItem)} aria-expanded={isToggled}>
      <ButtonPrimary
        href={props.url}
        className={cx(styles.navMain_MobileLink, {
          activeItem: isToggled,
        })}
        label={props.name}
        onClick={() => setIsToggled(!isToggled)}
        link={Link}
      />
      {props.subMenu && (
        <div
          className={styles.navMain_MobileExpanded}
          data-show={isToggled.toString()}
        >
          {props.subMenu}
        </div>
      )}
    </div>
  );
};
