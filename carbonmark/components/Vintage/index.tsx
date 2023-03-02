import { Text } from "components/Text";
import { FC } from "react";

import * as styles from "./styles";

type Props = {
  vintage: string;
};

export const Vintage: FC<Props> = (props) => {
  return (
    <Text t="body2" className={styles.vintage}>
      {props.vintage}
    </Text>
  );
};
