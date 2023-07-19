import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
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
      <span>{concatAddress(props.address)}</span>
      <ButtonPrimary
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        label={t(`View`)}
        variant="transparent"
        className={styles.viewButton}
        icon={<Launch />}
        iconPos="suffix"
      ></ButtonPrimary>
    </div>
  );
};
