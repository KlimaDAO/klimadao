import React, { FC } from "react";
import * as styles from "./styles";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  number?: string;
}

export const NavItemMobile: FC<Props> = (props) => {
  return (
    <div className={styles.navMain_MobileItem}>
      <a {...props} className={styles.navMain_MobileLink} href={props.url}>
        <div className={styles.navMain_MobileItemInner}>
          <span className={styles.navMain_MobileItemInnerNumber}>
            {props.number}
          </span>
          {props.name}
        </div>
      </a>
    </div>
  );
};
