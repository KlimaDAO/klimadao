import React, { FC } from "react";
import Image from "next/image";

import { Spinner, Text } from "@klimadao/lib/components";
import * as styles from "./styles";
import { cx } from "@emotion/css";

interface Props {
  label: string;
  icon: StaticImageData;
  name: string;
  amount?: string;
  labelAlignment?: "start" | "end";
  loading?: boolean;
  warn?: boolean;
}

export const MiniTokenDisplay: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Text
        t="caption"
        color="lightest"
        className={cx("label", {
          alignEnd: props.labelAlignment === "end",
        })}
      >
        {props.label}
      </Text>
      <div className={styles.card}>
        <Image src={props.icon} width={48} height={48} alt={props.name} />
        {props.loading ? (
          <Spinner />
        ) : (
          <Text
            t="body3"
            className={cx("value", {
              alignEnd: props.labelAlignment === "end",
              warn: !!props.warn,
            })}
          >
            {props.amount || "0"}
          </Text>
        )}
      </div>
    </div>
  );
};
