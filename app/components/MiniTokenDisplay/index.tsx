import React, { FC, ReactNode } from "react";
import { StaticImageData } from "next/image";
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
  helperText?: string;
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
        width={42}
        height={42}
        alt={props.name}
      />

      {props.loading ? (
        <Spinner />
      ) : (
        <Text
          t="body1"
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
    {!!props.helperText && (
      <Text t="body8" color="lightest">
        {props.helperText}
      </Text>
    )}
  </div>
);
