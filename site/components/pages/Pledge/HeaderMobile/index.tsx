import { ButtonPrimary, KlimaInfinityLogoOnly } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import dynamic from "next/dynamic";
import { FC } from "react";

import EditIcon from "@mui/icons-material/Edit";

import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
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
  const { address, isConnected, toggleModal, disconnect } = useWeb3();
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

          {!address && !isConnected && (
            <ButtonPrimary
              label={t({
                id: "shared.login_connect",
                message: "Login / Connect",
              })}
              onClick={toggleModal}
            />
          )}
          {address && isConnected && (
            <ButtonPrimary
              label={concatAddress(address)}
              onClick={disconnect}
            />
          )}
        </div>
      </header>
    </div>
  );
};
