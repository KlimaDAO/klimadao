import React, { FC } from "react";
import * as styles from "./styles";
import { Link } from "../types";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  active?: boolean;
  link?: Link;
}

export const NavItemDesktop: FC<Props> = (props) => {
  if (props.link) {
    return (
      <props.link href={props.url}>
        <a
          {...props}
          className={styles.navMain_DesktopLink}
          data-active={props.active}
        >
          {props.name}
        </a>
      </props.link>
    );
  }

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
