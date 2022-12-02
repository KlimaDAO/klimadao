import React, { FC } from "react";
import dynamic from "next/dynamic";
import { t } from "@lingui/macro";
import { KlimaInfinityLogo, ButtonPrimary } from "@klimadao/lib/components";
import Link from "next/link";
import * as styles from "./styles";

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

const ConnectModal = dynamic(
  () => import("@klimadao/lib/components").then((mod) => mod.ConnectModal),
  {
    ssr: false,
  }
);

type Props = {
  canEditPledge?: boolean;
  toggleEditModal?: (bool: boolean) => void;
};

export const HeaderDesktop: FC<Props> = (props) => {
  return (
    <div className={styles.headerDesktop}>
      <div className={styles.mainHeader}>
        <div className={styles.logo}>
          <Link passHref href={"/pledge"}>
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
        <ConnectModal
          errorMessage={t({
            message: "We had some trouble connecting. Please try again.",
            id: "connect_modal.error_message",
          })}
          torusText={t({
            message: "or continue with",
            id: "connectModal.continue",
          })}
          titles={{
            connect: t({
              id: "connect_modal.sign_in",
              message: "Sign In / Connect",
            }),
            loading: t({
              id: "connect_modal.connecting",
              message: "Connecting...",
            }),
            error: t({
              id: "connect_modal.error_title",
              message: "Connection Error",
            }),
          }}
          buttonText={t({ id: "shared.connect", message: "Connect" })}
        />
      </div>
    </div>
  );
};
