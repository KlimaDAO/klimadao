import React, { FC } from "react";
import { ButtonBaseProps, ButtonSecondary } from "@klimadao/lib/components";
import { cx } from "@emotion/css";
import * as styles from "./styles";

export const MarketplaceButton: FC<ButtonBaseProps> = (props) => {
  const className = cx(styles.marketplaceButtonGray, props.className);
  return <ButtonSecondary {...props} className={className} />;
};
