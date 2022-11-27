import { Image } from "components/Image";
import { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";

import { cx } from "@emotion/css";
import { Spinner, Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";
import * as styles from "./styles";

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
    {!!props.helperText && (
      <Text t="body8" color="lightest">
        {props.helperText}
      </Text>
    )}
  </div>
);
