import { Text } from "components/Text";
import { FC } from "react";

import { cx } from "@emotion/css";
import * as styles from "./styles";

type Props = {
  vintage: string;
  className?: string;
};

export const Vintage: FC<Props> = (props) => {
  return (
    <Text t="body2" className={cx(styles.vintage, props.className)}>
      {props.vintage}
    </Text>
  );
};
