import { cx } from "@emotion/css";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import Link from "next/link";
import React, { FC, useState } from "react";
import { NavItemMobileID } from "./index";
import * as styles from "./styles";

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
        renderLink={(linkProps) => <Link {...linkProps} />}
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
