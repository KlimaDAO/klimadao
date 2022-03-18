import React, { FC } from "react";
import Image from "next/image";

import { Spinner, Text } from "@klimadao/lib/components";
import * as styles from "./styles";

interface Props {
  label: string;
  icon: StaticImageData;
  name: string;
  amount?: string;
  labelAlignment?: "start" | "end";
  loading?: boolean;
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
        {props.loading ? (
          <Spinner />
        ) : (
          <Text t="body3">{props.amount || "0"}</Text>
        )}
      </div>
    </div>
  );
};
