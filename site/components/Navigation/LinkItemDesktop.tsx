import React, { FC } from "react";
import * as styles from "./styles";
import Link from "next/link";
import { cx } from "@emotion/css";

interface Props {
  name: string;
  url: string;
  active?: boolean;
}

export const LinkItemDesktop: FC<Props> = (props) => {
  return (
    <div className={cx(styles.navMain_DesktopItemContainer)}>
      <Link
        href={props.url}
        className={styles.navMain_DesktopLink}
        data-active={props.active?.toString()}
      >
        {props.name}
      </Link>
    </div>
  );
};
