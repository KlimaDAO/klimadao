import React, { FC } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { ButtonPrimary, KlimaInfinityLogoOnly } from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";

import EditIcon from "@mui/icons-material/Edit";

import Link from "next/link";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

interface Props {
  canEditPledge?: boolean;
  toggleEditModal?: (bool: boolean) => void | (() => void);
}

export const HeaderMobile: FC<Props> = (props) => {
  const { address, disconnect, isConnected } = useWeb3();

  return (
    <div className={styles.headerMobileWrap}>
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/pledge"}>
            <KlimaInfinityLogoOnly />
          </Link>
        </div>

        <div className={styles.navMain_Buttons}>
          <ThemeToggle className={styles.themeToggle} />

          {props.canEditPledge && (
            <button
              className={styles.editButton}
              onClick={() => props.toggleEditModal?.(true)}
            >
              <EditIcon />
            </button>
          )}

          {isConnected && address ? (
            <ButtonPrimary
              className={styles.authButton}
              label={concatAddress(address)}
              onClick={disconnect}
            />
          ) : (
            <ButtonPrimary
              className={styles.authButton}
              label={t({ id: "shared.connect", message: "Connect" })}
              // onClick={connect}
            />
          )}
        </div>
      </header>
    </div>
  );
};
