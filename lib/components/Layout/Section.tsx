import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  variant?: "white";
  contentVariant?: "contained";
}

export const Section: FC<Props> = (props) => {
  const style =
    props.variant === "white" ? styles.sectionVariant : styles.section;
  const inner =
    props.contentVariant === "contained"
      ? styles.sectionInnerContained
      : styles.sectionInner;
  return (
    <div className={style}>
      <div className={inner}>{props.children}</div>
    </div>
  );
};
