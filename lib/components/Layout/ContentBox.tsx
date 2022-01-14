import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  variant?: "hero";
}

export const ContentBox: FC<Props> = (props) => {
  const style =
    props.variant === "hero" ? styles.contentBoxHero : styles.contentBox;

  return (
    <div className={style}>
      <div>{props.children}</div>
    </div>
  );
};
