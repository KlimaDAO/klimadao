import { Text } from "@klimadao/lib/components";
import Image from "next/image";
import * as styles from "./styles";
import { FC, ReactNode } from "react";

import leafImage from "public/leaf.png";
import greenHills from "public/green_hills.png";

type Props = {
  title: ReactNode;
  subline: ReactNode;
};

export const RetirementHeader: FC<Props> = ({ title, subline }) => {
  return (
    <div className={styles.retirementHeader}>
      <Image
        alt="Green Hill"
        src={greenHills}
        layout="fill"
        objectFit="cover"
      />
      <Image alt="Leaf Picture" width={32} height={32} src={leafImage} />
      <div className={styles.imageGradient}></div>
      <Text t="h2" align="center" className={styles.retirementHeaderText}>
        {title}
      </Text>
      <Text t="h4" align="center" className={styles.retirementHeaderText}>
        {subline}
      </Text>
    </div>
  );
};
