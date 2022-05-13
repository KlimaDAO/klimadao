import React, { useState, useEffect } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import * as styles from "./styles";

const CopyAddressButton = (params: { address: string; ariaLabel: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(params.address);
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

  return !copied ? (
    <div>
      <button
        aria-label={params.ariaLabel}
        onClick={handleCopy}
        className={styles.copyAddressButton}
      >
        <ContentCopyIcon className={styles.copyAddressButtonIcon} />
      </button>
    </div>
  ) : (
    <p className={styles.checkmark}>✔️</p>
  );
};

export default CopyAddressButton;
