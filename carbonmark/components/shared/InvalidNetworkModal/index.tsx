import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Text } from "components/Text";

import { polygonNetworks } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { FC, useEffect, useState } from "react";
import { Modal } from "../Modal";
import * as styles from "./styles";

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
    <Modal
      title={
        <Text t="h4">
          ⚠ <Trans>Wrong Network</Trans>
        </Text>
      }
      showModal={showModal}
    >
      <Text t="body1" color="lightest" style={{ fontWeight: "normal" }}>
        <Trans>This app only works on Polygon Mainnet.</Trans>
      </Text>
      <div className={styles.switchButtonContainer}>
        <ButtonPrimary
          label={<Trans>Switch to Polygon</Trans>}
          onClick={handleChangeNetwork("mainnet")}
        />
      </div>
    </Modal>
  );
};
