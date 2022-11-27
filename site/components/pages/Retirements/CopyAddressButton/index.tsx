import { cx } from "@emotion/css";
import Check from "@mui/icons-material/Check";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { FC } from "react";

import { useCopyToClipboard } from "hooks/useCopyToClipboard";
import * as styles from "./styles";

type Props = {
  address: string;
  label?: string;
  size?: "medium" | "small";
};

export const CopyAddressButton: FC<Props> = ({
  address,
  label,
  size = "medium",
}) => {
  const [copied, doCopy] = useCopyToClipboard();

  const className = cx(styles.copyButton, styles[size]);

  return (
    <button className={className} onClick={() => doCopy(address)}>
      {label || address}
      {copied ? (
        <Check fontSize="inherit" />
      ) : (
        <ContentCopy fontSize="inherit" />
      )}
    </button>
  );
};
