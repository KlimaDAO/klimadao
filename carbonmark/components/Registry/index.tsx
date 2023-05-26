import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  registry: string;
};

export const Registry: FC<Props> = (props) => {
  return (
    <Text t="body2" className={styles.registry}>
      {props.registry}
    </Text>
  );
};
