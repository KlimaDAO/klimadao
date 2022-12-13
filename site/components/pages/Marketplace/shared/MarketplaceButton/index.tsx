import React, { FC } from "react";
import { ButtonBaseProps, ButtonSecondary } from "@klimadao/lib/components";
import * as styles from "./styles";

export const MarketplaceButton: FC<ButtonBaseProps> = (props) => {
  return (
    <ButtonSecondary {...props} className={styles.marketplaceButtonGray} />
  );
};
