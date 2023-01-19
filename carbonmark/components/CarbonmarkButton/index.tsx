import { cx } from "@emotion/css";
import { ButtonBaseProps, ButtonSecondary } from "@klimadao/lib/components";
import { FC } from "react";
import * as styles from "./styles";

export const CarbonmarkButton: FC<ButtonBaseProps> = (props) => {
  const className = cx(styles.buttonGray, props.className);
  return <ButtonSecondary {...props} className={className} />;
};
