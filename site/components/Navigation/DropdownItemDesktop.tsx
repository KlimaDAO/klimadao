import React, { FC } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";
import Tippy from "@tippyjs/react";

interface Props {
  name: string;
  children: JSX.Element[];
  active?: boolean;
}

export const DropdownItemDesktop: FC<Props> = (props) => {
  return (
    <div className={cx(styles.navMain_DesktopItemContainer)}>
      <Tippy
        content={
          <div className={styles.navMain_DesktopSubMenu}>{props.children}</div>
        }
        interactive={true}
      >
        <button
          className={cx(styles.navMain_DesktopLink, {
            dropdown: true,
          })}
          data-active={props.active?.toString()}
        >
          {props.name}
        </button>
      </Tippy>
    </div>
  );
};
