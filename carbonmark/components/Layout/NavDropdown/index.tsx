import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Domain } from "@klimadao/lib/types/domains";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Close, LoginOutlined, Menu } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ParkIcon from "@mui/icons-material/Park";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import StoreIcon from "@mui/icons-material/Store";
import Tippy from "@tippyjs/react";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { useConnectedUser } from "hooks/useConnectedUser";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { MenuButton } from "../MenuButton";
import * as styles from "./styles";

interface Props {
  userAddress?: string;
  connectedAddress?: string;
  connectedDomain?: Domain;
}

export const NavDropdown: FC<Props> = () => {
  const { pathname } = useRouter();
  const { address, disconnect } = useWeb3();
  const [showMenu, setShowMenu] = useState(false);
  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(address);

  const connectedDomain = useGetDomainFromAddress(address);
  const isConnected = !!address || !!connectedDomain;
  const profileLink = isConnected ? `/users/${address}` : `/users/login`;

  const content = (
    <>
      <div className={styles.userProfile} />
      <MenuButton
        href={"/projects"}
        icon={<StoreIcon />}
        isActive={
          pathname.startsWith("/projects") ||
          pathname.startsWith("/purchase") ||
          isUnconnectedUser
        }
      >
        <Trans>Marketplace</Trans>
      </MenuButton>
      <MenuButton
        href={"/retire"}
        icon={<ParkIcon />}
        isActive={pathname.startsWith("/retire")}
      >
        <Trans>Retire</Trans>
      </MenuButton>
      <MenuButton
        href={profileLink}
        icon={<PermIdentityIcon />}
        isActive={pathname.startsWith(`/users/login`) || isConnectedUser}
      >
        <Trans>Profile</Trans>
      </MenuButton>
      <MenuButton
        href={"/portfolio"}
        icon={<SpaceDashboardIcon />}
        isActive={pathname.startsWith("/portfolio")}
      >
        <Trans>Carbon Portfolio</Trans>
      </MenuButton>
      <MenuButton
        hasSubMenu={true}
        href={"/language"}
        icon={<LanguageIcon />}
        isActive={pathname.startsWith("/language")}
      >
        <Trans>Language</Trans>
      </MenuButton>

      {address && isConnected && (
        <MenuButton
          href={""}
          isActive={false}
          onClick={disconnect}
          icon={<LogoutIcon />}
        >
          <Trans>Logout</Trans>
        </MenuButton>
      )}

      <div className={styles.menuWrapper}>
        {!address && !isConnected && (
          <ButtonPrimary
            label={<Trans>Login or Sign Up</Trans>}
            icon={<LoginOutlined />}
            // disabled={initializing}
            // onClick={toggleModal}
          />
        )}
        <CarbonmarkButton
          label={<Trans>Book a demo</Trans>}
          href={urls.carbonmarkContactForm}
          className={styles.bookDemoButton}
          renderLink={(linkProps) => <Anchor {...linkProps} />}
        />
      </div>
    </>
  );

  return (
    <Tippy
      offset={[0, -48]}
      content={content}
      interactive={true}
      placement="top-end"
      visible={showMenu}
      className={styles.tooltip}
      onClickOutside={(_, e) => e.preventDefault()}
    >
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={styles.navMenuButton}
        aria-label={t`Navigation Menu`}
      >
        {!showMenu ? <Menu /> : <Close />}
      </button>
    </Tippy>
  );
};
