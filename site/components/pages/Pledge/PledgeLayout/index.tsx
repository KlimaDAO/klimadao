import React, { FC } from "react";
import dynamic from "next/dynamic";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";
import Link from "next/link";

import { useWeb3 } from "hooks/useWeb3/web3context";
import { HeaderMobile } from "../HeaderMobile";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  canEditPledge: boolean;
  toggleEditModal: (bool: boolean) => void;
};

export const PledgeLayout: FC<Props> = (props) => {
  const { address, connect, disconnect, isConnected } = useWeb3();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <HeaderMobile
          canEditPledge={props.canEditPledge}
          toggleEditModal={props.toggleEditModal}
        />

        <div className={styles.headerBar}>
          <div className={styles.mainHeader}>
            <div className={styles.logo}>
              <Link href={"/pledge"}>
                <a>
                  <KlimaInfinityLogo />
                </a>
              </Link>
            </div>
            <div className={styles.betaBadge}>Beta</div>
          </div>

          <div className={styles.group}>
            <ThemeToggle className={styles.themeToggle} />

            {props.canEditPledge && (
              <ButtonPrimary
                key="toggleModal"
                label="Edit Pledge"
                onClick={() => props.toggleEditModal(true)}
              />
            )}

            {isConnected && address ? (
              <ButtonPrimary
                label={concatAddress(address)}
                onClick={disconnect}
              />
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
