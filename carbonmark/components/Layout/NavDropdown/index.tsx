import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Menu } from "@mui/icons-material";
import Tippy from "@tippyjs/react";
import { LinkItemDesktop } from "components/shared/Navigation/LinkItemDesktop";
import { FC, useState } from "react";
import * as styles from "./styles";

export const NavDropdown: FC = () => {
  const { disconnect } = useWeb3();
  const [showMenu, setShowMenu] = useState(false);

  const content = (
    <>
      <div className={styles.userProfile} />
      <LinkItemDesktop
        url="/projects"
        name={t`Marketplace`}
        key="marketplace"
        // active={activePage === "Projects"}
      />
      <LinkItemDesktop
        url="/retire"
        name={t`Retire`}
        key="retire"
        // active={activePage === "Projects"}
      />
      <LinkItemDesktop
        url="/profile"
        name={t`Profile`}
        key="profile"
        // active={activePage === "Projects"}
      />
      <LinkItemDesktop
        url="/carbon-portfolio"
        name={t`Carbon Profile`}
        key="carbon-portfolio"
        // active={activePage === "Projects"}
      />
      <LinkItemDesktop
        url="/language"
        name={t`Language`}
        key="language"
        // active={activePage === "Projects"}
      />
      <button className={styles.navItem} onClick={disconnect}>
        Logout
      </button>
    </>
  );

  return (
    <Tippy
      offset={[0, -47]}
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
        <Menu />
      </button>
    </Tippy>
  );
};
