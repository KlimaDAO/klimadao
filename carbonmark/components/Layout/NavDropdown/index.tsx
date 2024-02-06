import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import Language from "@mui/icons-material/Language";

import {
  Close,
  KeyboardArrowLeftOutlined,
  LoginOutlined,
  Menu,
} from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ParkIcon from "@mui/icons-material/Park";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import StoreIcon from "@mui/icons-material/StoreOutlined";
import Tippy from "@tippyjs/react";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { UserProfile } from "components/UserProfile";
import { useConnectedUser } from "hooks/useConnectedUser";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { MenuButton } from "../MenuButton";
import * as styles from "./styles";

import { locales } from "lib/i18n";

export const NavDropdown: FC = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const { address, toggleModal, initializing, disconnect } = useWeb3();
  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(address);

  const [showMenu, setShowMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const connectedDomain = useGetDomainFromAddress(address);
  const isConnected = !!address || !!connectedDomain;
  const profileLink = isConnected ? `/users/${address}` : `/users/login`;

  const handleLogin = () => {
    setShowMenu(false);
    toggleModal?.();
  };

  const languageContent = (
    <>
      <div className={styles.userProfile}>{isConnected && <UserProfile />}</div>
      <button
        className={styles.selectLanguageButton}
        onClick={() => setShowLanguageMenu(false)}
      >
        <div className="iconContainer">
          <KeyboardArrowLeftOutlined />
        </div>
        <Trans>Select a language</Trans>
      </button>
      <div>
        {Object.keys(locales).map((localeKey) => (
          <MenuButton
            href=""
            key={localeKey}
            data-active={locale == localeKey ? "true" : "false"}
            onClick={() => {
              router.push({ pathname, query }, asPath, { locale: localeKey });
              setShowLanguageMenu(false);
            }}
            icon={<Language />}
            isActive={false}
          >
            {locales[localeKey].label}
          </MenuButton>
        ))}
      </div>
    </>
  );

  const menuContent = (
    <>
      <div className={styles.userProfile}>{isConnected && <UserProfile />}</div>
      <MenuButton
        href="/projects"
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
        href="/retire"
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
        href="/portfolio"
        icon={<SpaceDashboardIcon />}
        isActive={pathname.startsWith("/portfolio")}
      >
        <Trans>Carbon Portfolio</Trans>
      </MenuButton>
      <MenuButton
        href={""}
        hasSubMenu
        icon={<LanguageIcon />}
        onClick={() => setShowLanguageMenu(true)}
        isActive={pathname.startsWith("/language")}
      >
        <Trans>Language</Trans>
      </MenuButton>
      {address && isConnected && (
        <MenuButton
          href=""
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
            onClick={handleLogin}
            label={<Trans>Login or Sign Up</Trans>}
            icon={<LoginOutlined />}
            disabled={initializing}
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
      content={showLanguageMenu ? languageContent : menuContent}
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
function useSelector(selectAppState: any): { locale: any } {
  throw new Error("Function not implemented.");
}
