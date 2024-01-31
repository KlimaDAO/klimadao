import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Close, Menu } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ParkIcon from "@mui/icons-material/Park";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import StoreIcon from "@mui/icons-material/Store";
import Tippy from "@tippyjs/react";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { MenuButton } from "../MenuButton";
import * as styles from "./styles";

export const NavDropdown: FC = () => {
  const { pathname } = useRouter();
  const { disconnect } = useWeb3();
  const [showMenu, setShowMenu] = useState(false);

  const content = (
    <>
      <div className={styles.userProfile} />
      <MenuButton
        href={"/projects"}
        icon={<StoreIcon />}
        isActive={
          pathname.startsWith("/projects") || pathname.startsWith("/purchase")
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
        href={"/profile"}
        icon={<PermIdentityIcon />}
        isActive={pathname.startsWith("/profile")}
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
        href={"/language"}
        icon={<LanguageIcon />}
        isActive={pathname.startsWith("/language")}
      >
        <Trans>Language</Trans>
      </MenuButton>
      <MenuButton
        href={""}
        onClick={disconnect}
        icon={<LogoutIcon />}
        isActive={false}
      >
        <Trans>Logout</Trans>
      </MenuButton>
      <div className={styles.menuWrapper}>
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
      onClickOutside={() => setShowMenu(false)}
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
