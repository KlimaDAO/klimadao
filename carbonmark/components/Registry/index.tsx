import { Text } from "components/Text";
import { getRegistry } from "lib/getRegistry";
import { FC } from "react";
import * as styles from "./styles";


type Props = {
  projectKey: string;
};

export const Registry: FC<Props> = (props) => {
  return (
    <Text className={styles.registry}>
      {getRegistry(props.projectKey)}
    </Text>
  );
};
