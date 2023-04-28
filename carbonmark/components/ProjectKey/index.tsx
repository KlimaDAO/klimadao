import { Text } from "components/Text";
import { FC } from "react";

import * as styles from "./styles";

type Props = {
  projectKey: string;
};

export const ProjectKey: FC<Props> = (props) => {
  return (
    <Text t="body2" className={styles.projectKey}>
      {props.projectKey}
    </Text>
  );
};
