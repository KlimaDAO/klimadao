import React, { FC } from "react";
import { providers } from "ethers";
import styles from "./index.module.css";

interface Props {
  address: string;
  ariaLabel: string;
  ticker: string;
  image: string;
  provider: providers.Web3Provider;
}

const AddToMetaMaskButton: FC<Props> = (props) => {
  const { provider } = props.provider;
  const handleAddToMetaMask = async () => {
    try {
      await provider.request?.({
        method: "wallet_watchAsset",
        params: {
          // @ts-ignore complaining that it wants type Any[] for options but heres the interface https://docs.metamask.io/guide/rpc-api.html#wallet-watchasset
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
      onClick={handleAddToMetaMask}
      className={styles.addToMetaMaskButton}
    >
      <img alt={props.ariaLabel} src="/metamask-fox.svg" />
    </button>
  );
};

export default AddToMetaMaskButton;
