import React, { FC } from "react";
import { cx } from "@emotion/css";
import * as styles from "./styles";

interface Props {
  variant?: "white";
  contentVariant?: "contained" | "hero";
}

export const Section: FC<Props> = (props) => {
  const variant = (props.variant && styles.sectionVariant) || styles.section;
  const contained =
    props.contentVariant === "contained" && styles.sectionInnerContained;
  const hero = props.contentVariant === "hero" && styles.sectionInnerHero;

  const inner = cx(styles.sectionInner, contained, hero);

  return (
    <div className={variant}>
      <div className={inner}>{props.children}</div>
    </div>
  );
};
