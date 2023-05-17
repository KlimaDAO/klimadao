import { cx } from "@emotion/css";
import { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";

import { Anchor, Text } from "@klimadao/lib/components";
import Image from "next/image";

import * as styles from "../pages/Retire/RetireModal/styles";

interface RetireValueProps {
  label: ReactNode;
  value: string;
  icon?: StaticImageData;
  iconName?: string;
  warn?: boolean;
  /** If you want to wrap the value in a hyperlink, e.g. to polygonscan*/
  valueHref?: string;
}

export const HighlightValue: FC<RetireValueProps> = (props) => {
  return (
    <div className={styles.valueContainer}>
      <div className="label">{props.label}</div>
      <div className={styles.value}>
        {props.icon && (
          <Image
            className="icon"
            src={props.icon}
            width={28}
            height={28}
            alt={props.iconName || ""}
          />
        )}

        {props.valueHref ? (
          <Anchor
            href={props.valueHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text
              t="body3"
              className={cx("value", {
                warn: !!props.warn,
              })}
              style={{ textDecoration: "underline" }}
            >
              {props.value}
            </Text>
          </Anchor>
        ) : (
          <Text
            t="body3"
            className={cx("value", {
              warn: !!props.warn,
            })}
          >
            {props.value}
          </Text>
        )}
      </div>
    </div>
  );
};
