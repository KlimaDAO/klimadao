import React, { FC, ReactNode } from "react";
import Image from "next/image";

import { Spinner, Text } from "@klimadao/lib/components";
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

export const MiniTokenDisplay: FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={cx("label", {
          alignEnd: props.labelAlignment === "end",
        })}
      >
        {props.label}
      </div>
      <div className={styles.card}>
        <div className="image">
          <Image src={props.icon} width={48} height={48} alt={props.name} />
        </div>
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
