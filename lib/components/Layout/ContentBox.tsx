import React, { FC } from "react";
import * as styles from "./styles";

const mappedStyles = {
  hero: styles.contentBoxHero,
};

interface Props {
  variant?: "hero";
  customStyles?: React.CSSProperties;
}

export const ContentBox: FC<Props> = (props) => {
  const className =
    (props.variant && mappedStyles[props.variant]) || styles.contentBox;

  return (
    <div className={className} style={props.customStyles}>
      {props.children}
    </div>
  );
};
