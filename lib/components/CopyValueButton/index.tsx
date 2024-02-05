import { cx } from "@emotion/css";
import { Check, ContentCopy } from "@mui/icons-material";

import React, { FC, useEffect, useState } from "react";

import { ButtonBaseProps, ButtonPrimary } from "@klimadao/lib/components";
import { useCopyToClipboard } from "@klimadao/lib/hooks";
import * as styles from "./styles";

type Props = {
  value?: string;
  rounded?: boolean;
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
      icon={copied ? <Check /> : <ContentCopy />}
      onClick={() => cachedValue && doCopy(cachedValue)}
      shape={props.rounded ? "circle" : undefined}
      iconPos="suffix"
    />
  );
};
