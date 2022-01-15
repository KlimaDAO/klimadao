import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  isToggled: boolean;
}

export const NavMobile: FC<Props> = (props) => {
  const childrenWithNumber = React.Children.map(
    props.children,
    (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          number: `0${index + 1}`,
        });
      }
    }
  );

  return (
    <div
      className={
        props.isToggled ? styles.navMain_Mobile : styles.navMain_MobileClosed
      }
    >
      <div className={styles.navMain_MobileList}>{childrenWithNumber}</div>
    </div>
  );
};
