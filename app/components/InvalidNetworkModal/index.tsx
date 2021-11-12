import React, { useState, useEffect, FC } from "react";
import styles from "./index.module.css";
import t from "@klimadao/lib/theme/typography.module.css";
import { polygonNetworks } from "@klimadao/lib/constants";
import { providers } from "ethers";

interface Props {
  provider: providers.JsonRpcProvider;
}

export const InvalidNetworkModal: FC<Props> = ({ provider }) => {
  const [show, setShow] = useState(false);

  const onLoadProvider = async () => {
    if (!provider) {
      return;
    }
    // TODO: remove hardcoded chainId
    const network = await provider.getNetwork();
    if (!network) {
      return;
    }
    if (
      network.chainId !== polygonNetworks.mainnet.chainId &&
      network.chainId !== polygonNetworks.testnet.chainId
    ) {
      setShow(true);
    }
  };

  useEffect(() => {
    if (provider) onLoadProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  if (!show) {
    return null;
  }

  const handleChangeNetwork = (net: "mainnet" | "testnet") => async () => {
    const { hexChainId, rpcUrls, blockExplorerUrls, chainName } =
      polygonNetworks[net];

    const typedProvider = (provider as any)?.provider;
    if (typedProvider && typeof typedProvider.request === "function") {
      await typedProvider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: hexChainId,
            chainName,
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls,
            blockExplorerUrls,
          },
        ],
      });
    }
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <h2 className={t.h4}>⚠ Wrong Network</h2>
            <p className={t.body2}>
              This dApp only works on Polygon Mainnet and Polygon Mumbai
              Testnet.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.8rem",
            }}
          >
            <button
              onClick={handleChangeNetwork("testnet")}
              className={styles.switchNetworkButton_dismiss}
            >
              Switch to Testnet
            </button>
            <button
              onClick={handleChangeNetwork("mainnet")}
              className={styles.switchNetworkButton}
            >
              Switch to Mainnet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
