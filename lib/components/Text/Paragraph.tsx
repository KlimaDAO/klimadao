import React, { FC, HTMLAttributes } from "react";
import * as styles from "./styles";
import { Trans } from "@lingui/macro";

type Props = HTMLAttributes<HTMLParagraphElement>;

export const Paragraph: FC<Props> = (props) => {
  return (
    <p className={styles.copy} {...props}>
      <Trans>{props.children}</Trans>
    </p>
  );
};
