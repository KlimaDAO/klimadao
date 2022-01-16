import React, { FC } from "react";

import * as styles from "./styles";

const mappedStyles = {
  contained: styles.columnsContained,
};
interface Props {
  variant?: "contained";
}

export const Columns: FC<Props> = (props) => {
  const style =
    (props.variant && mappedStyles[props.variant]) || styles.columns;

  return <div className={style}>{props.children}</div>;
};
