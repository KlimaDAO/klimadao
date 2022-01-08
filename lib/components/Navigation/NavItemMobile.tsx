import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  name: string;
  url: string;
}

export const NavItemMobile: FC<Props> = (props) => {
  return (
    <div className={styles.navMain_MobileItem}>
      <a className={styles.navMain_MobileLink} href={props.url}>
        <div className={styles.navMain_MobileItemInner}>
          <span className={styles.navMain_MobileItemInnerNumber}>01</span>
          {props.name}
        </div>
      </a>
    </div>
  );
};
