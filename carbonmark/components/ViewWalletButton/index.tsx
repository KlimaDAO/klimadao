import { cx } from "@emotion/css";
import { Launch } from "@mui/icons-material";
import { FC } from "react";

import { ButtonPrimary } from "@klimadao/lib/components";
import { ButtonBaseProps } from "@klimadao/lib/components/Buttons/ButtonBase";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
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
        label={<Trans>View</Trans>}
        variant="transparent"
        className={styles.viewButton}
        icon={<Launch />}
        iconPos="suffix"
      ></ButtonPrimary>
    </div>
  );
};
