import { FC, ReactNode } from "react";
import { Text } from "@klimadao/lib/components";
import * as styles from "./styles";

type Props = {
  title: ReactNode;
  text: ReactNode;
};

export const TextGroup: FC<Props> = ({ title, text }) => {
  return (
    <div className={styles.textGroup}>
      <Text t="caption" color="lightest" uppercase>
        {title}
      </Text>
      <Text>{text}</Text>
    </div>
  );
};
