import React, { FC } from "react";
import { cx } from "@emotion/css";

import * as styles from "./styles";

interface Props {
  variant?: "contained" | "hero";
}

export const Columns: FC<Props> = (props) => {
  const contained = props.variant === "contained" && styles.columnsContained;
  const hero = props.variant === "hero" && styles.columnsHero;

  return (
    <div className={cx(styles.columns, contained, hero)}>{props.children}</div>
  );
};
