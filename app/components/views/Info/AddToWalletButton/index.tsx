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

const AddToWalletButton: FC<Props> = (props) => {
  const handleAddToWallet = async () => {
    try {
      const typedProvider = (props.provider as any)?.provider;
      if (typeof typedProvider?.request !== "function") {
        throw new Error("wallet not connected");
      }
      await typedProvider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: props.address,
            symbol: props.ticker,
            image: props.image,
            decimals: 9,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      aria-label={props.ariaLabel}
      onClick={handleAddToWallet}
      className={styles.addToWalletButton}
    >
      <img alt={props.ariaLabel} src="/metamask-fox.svg" />
    </button>
  );
};

export default AddToWalletButton;
