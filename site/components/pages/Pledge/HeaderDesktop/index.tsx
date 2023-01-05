import {
  ButtonPrimary,
  ConnectModal,
  KlimaInfinityLogo,
} from "@klimadao/lib/components";
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
            variant="blue"
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
          buttonVariant="blue"
          buttonText={t({
            id: "shared.login_connect",
            message: "Login / Connect",
          })}
        />
      </div>
    </div>
  );
};
