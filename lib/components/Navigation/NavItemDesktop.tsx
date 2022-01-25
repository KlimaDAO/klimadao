import React, { FC } from "react";
import * as styles from "./styles";
import { Link } from "../types";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  active?: boolean;
  link?: Link;
}

export const NavItemDesktop: FC<Props> = ({
  link: LinkElement,
  active,
  name,
  url,
  ...props
}) => {
  if (LinkElement) {
    return (
      <LinkElement href={url}>
        <a
          {...props}
          className={styles.navMain_DesktopLink}
          data-active={active?.toString()}
        >
          {name}
        </a>
      </LinkElement>
    );
  }

  return (
    <a
      {...props}
      className={styles.navMain_DesktopLink}
      href={url}
      data-active={active?.toString()}
    >
      {name}
    </a>
  );
};
