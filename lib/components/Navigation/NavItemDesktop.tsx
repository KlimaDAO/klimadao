import React, { FC } from "react";
import * as styles from "./styles";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  active?: boolean;
}

export const NavItemDesktop: FC<Props> = (props) => {
  return (
    <a
      {...props}
      className={styles.navMain_DesktopLink}
      href={props.url}
      data-active={props.active}
    >
      {props.name}
    </a>
  );
};
