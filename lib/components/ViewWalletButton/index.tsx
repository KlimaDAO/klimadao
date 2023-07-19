import { cx } from "@emotion/css";
import { Launch } from "@mui/icons-material";
import React, { FC } from "react";

import { ButtonPrimary } from "../";
import { concatAddress } from "../../utils";
import { ButtonBaseProps } from "../Buttons/ButtonBase";
import * as styles from "./styles";

type Props = {
  address: string;
} & ButtonBaseProps;

export const ViewWalletButton: FC<Props> = (props) => {
  const className = cx(styles.viewWalletButton, props.className);

  return (
    <div className={className}>
      <span className={}>{concatAddress(props.address)}</span>
      <ButtonPrimary
        href="https://polygon.tor.us/"
        target="_blank"
        rel="noopener noreferrer"
        label="VIEW"
        variant="transparent"
        className={styles.viewButton}
        icon={<Launch />}
        iconPos={"suffix"}
      ></ButtonPrimary>
    </div>
  );
};
