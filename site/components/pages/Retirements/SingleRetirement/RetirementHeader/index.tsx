import { Text } from "@klimadao/lib/components";
import Image from "next/image";
import * as styles from "./styles";
import { FC, ReactNode } from "react";

import leafImage from "public/leaf.svg";
import greenHills from "public/green_hills.png";
import { getImageSizes } from "@klimadao/lib/utils";

type Props = {
  overline: ReactNode;
  title: ReactNode;
  subline: ReactNode;
};

export const RetirementHeader: FC<Props> = (props) => {
  return (
    <div className={styles.retirementHeader}>
      <Image
        alt="Green Hill"
        src={greenHills}
        layout="fill"
        objectFit="cover"
        sizes={getImageSizes({ large: "1072px" })}
        placeholder="blur"
      />
      <div className={styles.imageGradient}></div>
      <div className="stack">
        <Image
          alt="Leaf Picture"
          width={44}
          height={44}
          src={leafImage}
          className={styles.leafImage}
        />
        <Text t="h4" align="center" className={styles.retirementHeaderText}>
          {props.overline}
        </Text>
      </div>
      <div className="stack">
        <Text t="h2" align="center" className={styles.retirementHeaderText}>
          {props.title}
        </Text>
        <Text t="badge" align="center" className={styles.retirementHeaderText}>
          {props.subline}
        </Text>
      </div>
    </div>
  );
};
