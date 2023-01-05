import { cx } from "@emotion/css";
import { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";

import { Image } from "components/Image";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

interface HighlightValueProps {
  label: ReactNode;
  value: string;
  icon?: StaticImageData;
  iconName?: string;
  warn?: boolean;
}

export const HighlightValue: FC<HighlightValueProps> = (props) => {
  return (
    <div className={styles.valueContainer}>
      <div className="label">{props.label}</div>
      <div className={styles.value}>
        {props.icon && (
          <Image
            className="icon"
            src={props.icon}
            width={48}
            height={48}
            alt={props.iconName || ""}
          />
        )}

        <Text
          t="body3"
          className={cx("value", {
            warn: !!props.warn,
          })}
        >
          {props.value}
        </Text>
      </div>
    </div>
  );
};
