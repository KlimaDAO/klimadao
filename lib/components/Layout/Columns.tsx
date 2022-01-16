import React, { FC } from "react";
import { cx } from "@emotion/css";
import * as styles from "./styles";

const variants = {
  contained: styles.columnsContained,
};

const sizes = {
  small: styles.columnsSmall,
  medium: styles.columns,
};
interface Props {
  variant?: "contained";
  size?: "small" | "medium";
  wrapItems?: boolean;
}

export const Columns: FC<Props> = (props) => {
  const variant = (props.variant && variants[props.variant]) || styles.columns;
  const size = (props.size && sizes[props.size]) || styles.columns;
  const wrapped = props.wrapItems && styles.columnsWrapped;

  return <div className={cx(size, variant, wrapped)}>{props.children}</div>;
};
