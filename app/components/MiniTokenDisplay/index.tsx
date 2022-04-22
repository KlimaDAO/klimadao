import React, { FC, ReactNode } from "react";
import { StaticImageData } from "components/Image";
import { Image } from "components/Image";

import { Spinner, Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";
import * as styles from "./styles";
import { cx } from "@emotion/css";

interface Props {
  label: ReactNode;
  icon: StaticImageData;
  name: string;
  amount?: string;
  labelAlignment?: "start" | "end";
  loading?: boolean;
  warn?: boolean;
}

export const MiniTokenDisplay: FC<Props> = (props) => (
  <div className={styles.container}>
    <div
      className={cx("label", {
        alignEnd: props.labelAlignment === "end",
      })}
    >
      {props.label}
    </div>
    <div className={styles.card}>
      <Image
        className="icon"
        src={props.icon}
        width={48}
        height={48}
        alt={props.name}
      />

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
          {!props.amount
            ? "0"
            : Number(props.amount) > 1
            ? trimStringDecimals(props.amount, 3)
            : trimStringDecimals(props.amount, 5)}
        </Text>
      )}
    </div>
  </div>
);
