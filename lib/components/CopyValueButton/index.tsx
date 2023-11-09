import { cx } from "@emotion/css";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import React, { FC, useEffect, useState } from "react";

import { ButtonBaseProps, ButtonPrimary } from "@klimadao/lib/components";
import { useCopyToClipboard } from "@klimadao/lib/hooks";
import * as styles from "./styles";

type Props = {
  value?: string;
} & ButtonBaseProps;

export const CopyValueButton: FC<Props> = (props) => {
  const [cachedValue, setValue] = useState<string | undefined>(props.value);
  const [copied, doCopy] = useCopyToClipboard();

  // get parameters on the client because
  // url can be undefined and window is undefined on server
  useEffect(() => {
    if (!props.value) setValue(window.location.href);
  }, []);

  const className = cx(styles.copyButton, props.className);

  return (
    <ButtonPrimary
      /** Transparent by default */
      variant={"transparent"}
      {...props}
      className={className}
      icon={copied ? <CheckIcon /> : <ContentCopyIcon />}
      onClick={() => cachedValue && doCopy(cachedValue)}
      iconPos="suffix"
    />
  );
};
