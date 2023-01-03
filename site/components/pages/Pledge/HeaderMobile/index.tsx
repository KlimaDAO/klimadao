import { ConnectModal, KlimaInfinityLogoOnly } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import dynamic from "next/dynamic";
import { FC } from "react";

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
  return (
    <div className={styles.headerMobileWrap}>
      <header className={styles.headerMobile}>
        <div className={styles.mainLogoMobile}>
          <Link href={"/pledge"} passHref>
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
      </header>
    </div>
  );
};
