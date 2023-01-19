import { cx } from "@emotion/css";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

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
