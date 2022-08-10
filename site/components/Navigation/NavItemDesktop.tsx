import React, { FC } from "react";
import * as styles from "./styles";
import Link from "next/link";
import { cx } from "@emotion/css";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  hovered?: boolean;
  buttons?: any;
  active?: boolean;
}

export const NavItemDesktop: FC<Props> = ({
  active,
  name,
  url,
  buttons,
  ...props
}) => {
  return (
    <div className={cx(styles.navMain_DesktopSelectContainer)}>
      <Link href={url}>
        <a
          className={cx(styles.navMain_DesktopLink, {
            dropdown: buttons !== undefined,
          })}
          href={url}
          data-active={active?.toString()}
          {...props}
        >
          {name}
        </a>
      </Link>
      {buttons && <div className="content">{buttons}</div>}
    </div>
  );
};
