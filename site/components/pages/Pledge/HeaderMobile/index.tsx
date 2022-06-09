import React, { FC } from "react";
import dynamic from "next/dynamic";
import { ButtonPrimary, KlimaInfinityLogoOnly } from "@klimadao/lib/components";
import EditIcon from "@mui/icons-material/Edit";
import { useWeb3 } from "hooks/useWeb3/web3context";
import { concatAddress } from "@klimadao/lib/utils";

import Link from "next/link";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

interface Props {
  canEditPledge: boolean;
  toggleEditModal: (bool: boolean) => void;
}

export const HeaderMobile: FC<Props> = (props) => {
  const { address, connect, disconnect, isConnected } = useWeb3();

  return (
    <div className={styles.headerMobileWrap}>
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/pledge"}>
            <a>
              <KlimaInfinityLogoOnly />
            </a>
          </Link>
          <div className={styles.betaBadge}>Beta</div>
        </div>

        <div className={styles.navMain_Buttons}>
          <ThemeToggle className={styles.themeToggle} />

          {props.canEditPledge && (
            <button
              className={styles.editButton}
              onClick={() => props.toggleEditModal(true)}
            >
              <EditIcon />
            </button>
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
      </header>
    </div>
  );
};
