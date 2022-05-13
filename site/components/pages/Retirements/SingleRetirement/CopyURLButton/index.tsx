import { FC, useState, useEffect } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";

export const CopyURLButton: FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        !!timer && clearTimeout(timer);
      };
    }
  }, [copied]);

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
