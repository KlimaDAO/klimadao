import React, { FC } from "react";
import * as styles from "./styles";
import Link from "next/link";
import { cx } from "@emotion/css";
import Tippy from "@tippyjs/react";
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
              dropdown: !!subMenu,
            })}
            data-active={active?.toString()}
            {...props}
          >
            {name}
          </a>
        </Link>
      ) : (
        <Tippy
          content={
            subMenu && (
              <div className={styles.navMain_DesktopSubMenu}>{subMenu}</div>
            )
          }
          interactive={true}
        >
          <button
            className={cx(styles.navMain_DesktopLink, {
              dropdown: !!subMenu,
            })}
            data-active={active?.toString()}
          >
            {name}
          </button>
        </Tippy>
      )}
    </div>
  );
};
