import React, { useState, useEffect, FC } from "react";
import styles from "./index.module.css";
import { Text } from "@klimadao/lib/components";
import { polygonNetworks } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";

export const InvalidNetworkModal: FC = () => {
  const { provider } = useWeb3();
  const [showModal, setShowModal] = useState(false);

  const onLoadProvider = async () => {
    if (!provider) return;

    // TODO: remove hardcoded chainId
    const network = await provider.getNetwork();
    if (!network) return;

    if (
      network.chainId !== polygonNetworks.mainnet.chainId &&
      network.chainId !== polygonNetworks.testnet.chainId
    ) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (provider) onLoadProvider();
  }, [provider]);

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

  if (!showModal) return null;

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <Text t="h3">
              ⚠ <Trans>Wrong Network</Trans>
            </Text>
            <Text t="body3" color="lightest" style={{ fontWeight: "normal" }}>
              <Trans>This app only works on Polygon Mainnet.</Trans>
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
              <Trans>Switch to Polygon</Trans>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
