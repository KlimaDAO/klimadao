import React, { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";

import { useProvider } from "lib/useProvider";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  buttons?: JSX.Element[];
};

export const PledgeLayout: FC<Props> = (props) => {
  const { provider, address, connect, disconnect } = useProvider();
  const [chainId, setChainId] = useState<number>();
  const isConnected = Boolean(address);

  const loadNetworkInfo = async () => {
    if (!provider) return;

    // if network is invalid, modal will ask for network change -> page will reload
    const networkInfo = await provider.getNetwork();
    if (chainId !== networkInfo.chainId) {
      setChainId(networkInfo.chainId);
    }
  };

  useEffect(() => {
    loadNetworkInfo();
  }, [provider, address]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <KlimaInfinityLogo />
          </div>
          <div className={styles.group}>
            <ThemeToggle className={styles.themeToggle} />

            {props.buttons && props.buttons}

            {isConnected ? (
              <ButtonPrimary label={address} onClick={disconnect} />
            ) : (
              <ButtonPrimary label="Connect" onClick={connect} />
            )}
          </div>
        </div>
      </div>

      <>{props.children}</>
    </div>
  );
};
