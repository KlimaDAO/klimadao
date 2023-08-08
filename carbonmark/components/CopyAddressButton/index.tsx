import { cx } from "@emotion/css";
import { Check, ContentCopy } from "@mui/icons-material";
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
        icon={copied ? <Check /> : <ContentCopy />}
        onClick={() => cachedAddress && doCopy(cachedAddress)}
        iconPos="suffix"
      />
    </div>
  );
};
