import React, { useState, useEffect, FC } from "react";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { polygonNetworks } from "@klimadao/lib/constants";
import { providers } from "ethers";
import { Trans } from "@lingui/macro";
import { Modal } from "components/Modal";
import * as styles from "./styles";
interface Props {
  provider?: providers.JsonRpcProvider;
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
    <Modal
      title={
        <Text t="h3">
          ⚠ <Trans>Wrong Network</Trans>
        </Text>
      }
    >
      <Text t="body3" color="lightest" style={{ fontWeight: "normal" }}>
        <Trans>This app only works on Polygon Mainnet.</Trans>
      </Text>
      <div className={styles.switchButtonContainer}>
        <ButtonPrimary
          className={styles.switchButton}
          label={<Trans>Switch to Polygon</Trans>}
          onClick={handleChangeNetwork("mainnet")}
        />
      </div>
    </Modal>
  );
};
