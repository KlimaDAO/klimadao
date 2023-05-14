import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import Image from "next/legacy/image";
import leafImage from "public/leaf.svg";
import { FC, ReactNode } from "react";
import * as styles from "./styles";

type Props = {
  overline: ReactNode;
  title: ReactNode;
  subline: ReactNode;
};

export const RetirementHeader: FC<Props> = (props) => (
  <div className={styles.retirementHeader}>
    <div className={styles.imageGradient}></div>
    <div className="stack">
      <Image
        alt="Leaf Picture"
        width={32}
        height={32}
        src={leafImage}
        className={styles.leafImage}
      />
      <Text
        t="h5"
        align="center"
        className={cx(styles.retirementHeaderText, styles.overline)}
      >
        {props.overline}
      </Text>
    </div>
    <div className="stack">
      <Text t="h3" align="center" className={styles.retirementHeaderText}>
        {props.title}
      </Text>
      <Text t="badge" align="center" className={styles.retirementHeaderText}>
        {props.subline}
      </Text>
    </div>
  </div>
);
