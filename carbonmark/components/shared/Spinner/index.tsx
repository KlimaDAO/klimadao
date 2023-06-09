import { cx } from "@emotion/css";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  className?: string;
};

export const Spinner: FC<Props> = (props) => {
  return (
    <div className={cx(styles.spinner, props.className)}>
      <div></div>
      <div></div>
    </div>
  );
};
