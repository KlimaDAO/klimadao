import React, { FC } from "react";
import { providers } from "ethers";
import styles from "./index.module.css";

interface Props {
  address: string;
  ariaLabel: string;
  ticker: string;
  image: string;
  provider: providers.JsonRpcProvider;
}

const AddToWalletButton: FC<Props> = ({
  address,
  ariaLabel,
  ticker,
  image,
  provider,
}) => {
  const handleAddToWallet = async () => {
    try {
      const typedProvider = (provider as any)?.provider;
      if (typedProvider && typeof typedProvider.request === "function") {
        await typedProvider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address,
              symbol: ticker,
              decimals: 9,
              image,
            },
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      aria-label={ariaLabel}
      onClick={handleAddToWallet}
      className={styles.addToWalletButton}
    >
      <img alt={ariaLabel} src="/metamask-fox.svg" />
    </button>
  );
};

export default AddToWalletButton;
