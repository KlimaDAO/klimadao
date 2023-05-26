import { Text } from "components/Text";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

type Props = {
  title: ReactNode;
  text: ReactNode;
};

export const TextGroup: FC<Props> = ({ title, text }) => (
  <div className={styles.textGroup}>
    <Text t="button" color="lightest" uppercase>
      {title}
    </Text>
    <Text t="h4">{text}</Text>
  </div>
);
