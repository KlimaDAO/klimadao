import { cx } from "@emotion/css";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FC, useEffect, useState } from "react";

import { ButtonBaseProps, ButtonPrimary } from "@klimadao/lib/components";
import { useCopyToClipboard } from "@klimadao/lib/hooks";
import { concatAddress } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  address: string;
} & ButtonBaseProps;

export const CopyAddressButton: FC<Props> = (props) => {
  const [cachedAddress, setAddress] = useState<string | undefined>(
    props.address
  );
  const [copied, doCopy] = useCopyToClipboard();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    if (!props.address) setAddress(window.location.href);
  }, []);

  const className = cx(styles.copyAddressButton, props.className);

  return (
    <div className={className}>
      <span>{concatAddress(props.address)}</span>
      <ButtonPrimary
        /** Transparent by default */
        variant={"transparent"}
        {...props}
        label={<Trans>Copy</Trans>}
        className={styles.copyButton}
        icon={copied ? <CheckIcon /> : <ContentCopyIcon />}
        onClick={() => cachedAddress && doCopy(cachedAddress)}
        iconPos="suffix"
      />
    </div>
  );
};
