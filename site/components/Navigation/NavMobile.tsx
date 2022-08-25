import React, { FC } from "react";
import * as styles from "./styles";
interface Props {
  isToggled: boolean;
}

export const NavMobile: FC<Props> = (props) => (
  <div
    className={
      props.isToggled ? styles.navMain_Mobile : styles.navMain_MobileClosed
    }
  >
    <div className={styles.navMain_MobileList}>{props.children}</div>
  </div>
);
