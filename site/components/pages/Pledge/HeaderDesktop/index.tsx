import { ButtonPrimary, KlimaInfinityLogo } from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";

import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  canEditPledge?: boolean;
  toggleEditModal?: (bool: boolean) => void;
};

export const HeaderDesktop: FC<Props> = (props) => {
  const { address, connect, disconnect, isConnected } = useWeb3();

  return (
    <div className={styles.headerDesktop}>
      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <Link href={"/pledge"}>
            <KlimaInfinityLogo />
          </Link>
        </div>
      </div>

      <div className={styles.rightGroup}>
        <ThemeToggle className={styles.themeToggle} />

        {props.canEditPledge && (
          <ButtonPrimary
            key="toggleModal"
            label={t({ id: "pledges.edit_pledge", message: "Edit Pledge" })}
            onClick={() => props.toggleEditModal?.(true)}
          />
        )}

        {isConnected && address ? (
          <ButtonPrimary label={concatAddress(address)} onClick={disconnect} />
        ) : (
          <ButtonPrimary
            label={t({ id: "shared.connect", message: "Connect" })}
            onClick={connect}
          />
        )}
      </div>
    </div>
  );
};
