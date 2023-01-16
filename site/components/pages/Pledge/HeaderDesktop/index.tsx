import { ButtonPrimary, KlimaInfinityLogo } from "@klimadao/lib/components";
import { darkTextButton } from "@klimadao/lib/theme/common";
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
  const { toggleModal, isConnected, address, disconnect } = useWeb3();
  return (
    <div className={styles.headerDesktop}>
      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <Link href={"/pledge"} passHref>
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
        {!address && !isConnected && (
          <ButtonPrimary
            className={darkTextButton}
            label={t({
              id: "shared.login_connect",
              message: "Login / Connect",
            })}
            onClick={toggleModal}
          />
        )}
        {address && isConnected && (
          <ButtonPrimary label={concatAddress(address)} onClick={disconnect} />
        )}
      </div>
    </div>
  );
};
