import React, { FC, HTMLAttributes } from "react";
import * as styles from "./styles";

type Props = HTMLAttributes<HTMLParagraphElement>;

export const Paragraph: FC<Props> = (props) => {
  return (
    <p className={styles.copy} {...props}>
      {props.children}
    </p>
  );
};
