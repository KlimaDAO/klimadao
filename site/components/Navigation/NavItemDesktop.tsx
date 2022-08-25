import React, { FC } from "react";
import * as styles from "./styles";
import Link from "next/link";
import { cx } from "@emotion/css";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url?: string;
  subMenu?: JSX.Element[];
  active?: boolean;
}

export const NavItemDesktop: FC<Props> = ({
  active,
  name,
  url,
  subMenu,
  ...props
}) => {
  return (
    <div className={cx(styles.navMain_DesktopSelectContainer)}>
      {url ? (
        <Link href={url}>
          <a
            className={cx(styles.navMain_DesktopLink, {
              dropdown: subMenu !== undefined,
            })}
            data-active={active?.toString()}
            {...props}
          >
            {name}
          </a>
        </Link>
      ) : (
        <div
          className={cx(styles.navMain_DesktopLink, {
            dropdown: subMenu !== undefined,
          })}
          data-active={active?.toString()}
        >
          {name}
        </div>
      )}
      {subMenu && <div className="content">{subMenu}</div>}
    </div>
  );
};
