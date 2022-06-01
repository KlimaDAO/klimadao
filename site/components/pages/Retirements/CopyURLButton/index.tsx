import { FC } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { useCopyToClipboard } from "hooks/useCopyToClipboard";

export const CopyURLButton: FC = () => {
  const [copied, doCopy] = useCopyToClipboard();

  const handleCopy = () => {
    doCopy(window.location.href);
  };

  return (
    <ButtonPrimary
      label={
        copied ? (
          <Trans id="button.copyURL.copied">Copied</Trans>
        ) : (
          <Trans id="button.copyURL.copy">Copy URL</Trans>
        )
      }
      onClick={handleCopy}
      variant="gray"
    />
  );
};
