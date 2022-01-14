import React, { FC } from "react";
import * as styles from "./styles";
import Link from "next/link";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  active?: boolean;
  internal?: boolean;
}

export const NavItemDesktop: FC<Props> = (props) => {
  if (props.internal) {
    return <Link href={props.url}>{props.name}</Link>;
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
