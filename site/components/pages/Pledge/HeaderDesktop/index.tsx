import React, { FC } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";
import Link from "next/link";
import { ConnectModal } from "components/ConnectModal";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  canEditPledge?: boolean;
  toggleEditModal?: (bool: boolean) => void;
};

export const HeaderDesktop: FC<Props> = (props) => {
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
        <ConnectModal />
      </div>
    </div>
  );
};
