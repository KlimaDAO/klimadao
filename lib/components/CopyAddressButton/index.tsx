import { cx } from "@emotion/css";
import { Check, ContentCopy } from "@mui/icons-material";
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
      variant={"transparent"}
      {...props}
      className={className}
      icon={copied ? <Check /> : <ContentCopy />}
      onClick={() => cachedAddress && doCopy(cachedAddress)}
      iconPos="suffix"
    />
  );
};
