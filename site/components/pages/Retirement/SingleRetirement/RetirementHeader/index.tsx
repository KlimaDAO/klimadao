import { Text } from "@klimadao/lib/components";
import Image from "next/image";
import * as styles from "./styles";
import { FC, ReactNode } from "react";

import leafImage from "public/leaf.png";

type Props = {
  title: ReactNode;
  subline: ReactNode;
};

export const RetirementHeader: FC<Props> = ({ title, subline }) => {
  return (
    <div className={styles.retirementHeader}>
      <Image alt="Leaf Picture" width={32} height={32} src={leafImage} />
      <Text t="h2" align="center" className={styles.retirementHeaderText}>
        {title}
      </Text>
      <Text t="h4" align="center" className={styles.retirementHeaderText}>
        {subline}
      </Text>
    </div>
  );
};
