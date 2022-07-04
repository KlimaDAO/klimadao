import { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { useCopyToClipboard } from "hooks/useCopyToClipboard";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Check from "@mui/icons-material/Check";
import * as styles from "./styles";

export const CopyURLButton: FC = () => {
  const [copied, doCopy] = useCopyToClipboard();

  const handleCopy = () => {
    doCopy(window.location.href);
  };

  return (
    <ButtonPrimary
      className={styles.copyButton}
      label={
        copied ? (
          <>
            <Trans id="button.copyURL.copied">Copied</Trans>
            <Check fontSize="inherit" />
          </>
        ) : (
          <>
            <Trans id="button.copyURL.copy">Copy URL</Trans>
            <ContentCopy fontSize="inherit" />
          </>
        )
      }
      onClick={handleCopy}
      variant="gray"
    />
  );
};
