import React, { FC, HTMLAttributes } from "react";
import { cx } from "@emotion/css";
import * as styles from "./styles";

type Props = HTMLAttributes<HTMLParagraphElement> & {
  text: string;
  align?: string;
};

export const Copy: FC<Props> = (props) => {
  const align = props.align === "center" && styles.alignCenter;
  const combinedStyles = cx(styles.copy, align);

  return (
    <p className={combinedStyles} {...props}>
      {props.text}
    </p>
  );
};
