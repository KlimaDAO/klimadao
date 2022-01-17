import React, { FC } from "react";
import * as styles from "./styles";

const mappedStyles = {
  white: styles.sectionWhite,
  contained: styles.sectionInnerContained,
  hero: styles.sectionInnerHero,
};

interface Props {
  variant?: "white";
  contentVariant?: "contained" | "hero";
}

export const Section: FC<Props> = (props) => {
  const outer =
    (props.variant && mappedStyles[props.variant]) || styles.section;
  const inner =
    (props.contentVariant && mappedStyles[props.contentVariant]) ||
    styles.sectionInner;

  return (
    <div className={outer}>
      <div className={inner}>{props.children}</div>
    </div>
  );
};
