import { Text } from "@klimadao/lib/components";
import Image from "next/image";
import React, { FC } from "react";

import * as styles from "./styles";

interface Props {
  label: string;
  icon: StaticImageData;
  name: string;
  amount?: string;
  labelAlignment?: "start" | "end";
}

export const MiniTokenDisplay: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <label
        style={
          props.labelAlignment === "end"
            ? { justifySelf: "flex-end" }
            : undefined
        }
      >
        <Text t="caption" color="lightest">
          {props.label}
        </Text>
      </label>
      <div className={styles.card}>
        <Image src={props.icon} width={48} height={48} alt={props.name} />
        <Text t="body3">{Number(props.amount ?? 0).toFixed(2)}</Text>
      </div>
    </div>
  );
};
