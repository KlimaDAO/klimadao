import React, { FC, useEffect, useState } from "react";
import { cx } from "@emotion/css";
import { ContentCopy } from "@mui/icons-material";
import { Check } from "@mui/icons-material";

import { useCopyToClipboard } from "../../hooks";
import * as styles from "./styles";
import { ButtonPrimary } from "../";
import { ButtonBaseProps } from "../Buttons/ButtonBase";

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
      {...props}
      className={className}
      icon={copied ? <Check /> : <ContentCopy />}
      onClick={() => cachedAddress && doCopy(cachedAddress)}
      variant={"transparent"}
      iconPos="suffix"
    />
  );
};
