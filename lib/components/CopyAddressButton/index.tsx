import { cx } from "@emotion/css";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { FC, useEffect, useState } from "react";

import { ButtonPrimary } from "../";
import { useCopyToClipboard } from "../../hooks";
import { ButtonBaseProps } from "../Buttons/ButtonBase";
import * as styles from "./styles";

type Props = {
  address?: string;
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

  const className = cx(styles.copyButton, props.className);

  return (
    <ButtonPrimary
      /** Transparent by default */
      variant="transparent"
      iconPos="suffix"
      className={className}
      icon={copied ? <CheckIcon /> : <ContentCopyIcon />}
      onClick={() => cachedAddress && doCopy(cachedAddress)}
      {...props}
    />
  );
};
