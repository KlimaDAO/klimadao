import React, { useState, useEffect, FC } from "react";
import styles from "./index.module.css";
import { Text } from "@klimadao/lib/components";
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
            <Text t="h3">⚠ Wrong Network</Text>
            <Text t="body3" color="lightest" style={{ fontWeight: "normal" }}>
              This dApp only works on Polygon Mainnet.
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.8rem",
            }}
          >
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
