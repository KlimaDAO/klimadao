import React, { FC, ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { LogoWithClaim, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { concatAddress } from "@klimadao/lib/utils";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";
import FlipOutlined from "@mui/icons-material/FlipOutlined";
import Payment from "@mui/icons-material/Payment";
import SpaOutlined from "@mui/icons-material/SpaOutlined";

import * as styles from "./styles";

interface MenuButtonProps {
  icon: ReactElement;
  href: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
const MenuButton: FC<MenuButtonProps> = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // hack for server rendering mismatch. See comment in IsomorphicRoutes.tsx
    setLoading(false);
  }, []);

  if (props.disabled) {
    return (
      <div
        className={styles.sidebarButton}
        data-active={loading ? false : props.isActive}
        data-disabled={true}
      >
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </div>
    );
  }
  // to ensure server render match, return plain anchor until hydration is complete
  if (props.href.startsWith("http") || loading) {
    return (
      <a
        className={styles.sidebarButton}
        data-active={loading ? false : props.isActive}
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </a>
    );
  }
  const handleClick = () => {
    props.onClick?.();
  };
  return (
    <Link
      onClick={handleClick}
      to={props.href}
      data-active={loading ? false : props.isActive}
      className={styles.sidebarButton}
    >
      <div className="iconContainer">{props.icon}</div>
      <span>{props.children}</span>
    </Link>
  );
};

interface Props {
  address?: string;
  onHide?: () => void;
}

export const NavMenu: FC<Props> = (props) => {
  const { pathname } = useLocation();

  const handleHide = () => {
    props.onHide?.();
  };

  return (
    <nav className={styles.container}>
      <div>
        <LogoWithClaim />
      </div>
      <div className="stack-12">
        <div className="hr" />
        <div className="stack-04">
          <Text t="caption">Your Wallet Address:</Text>
          <Text t="caption" color="lightest">
            {props.address ? concatAddress(props.address) : "NOT CONNECTED"}
          </Text>
        </div>
        <div className="hr" />
      </div>
      <MenuButton
        isActive={pathname === "/buy"}
        href={urls.tutorial}
        icon={<Payment fontSize="medium" />}
        onClick={handleHide}
      >
        Buy KLIMA
      </MenuButton>
      <MenuButton
        isActive={pathname === "/stake"}
        href="/stake"
        icon={<LibraryAddOutlined fontSize="medium" />}
        onClick={handleHide}
      >
        Stake KLIMA
      </MenuButton>
      <MenuButton
        isActive={pathname === "/bonds"}
        href="/bonds"
        icon={<SpaOutlined fontSize="medium" />}
        onClick={handleHide}
      >
        Bond Carbon
      </MenuButton>
      <MenuButton
        isActive={pathname === "/wrap"}
        href="/wrap"
        icon={<FlipOutlined fontSize="medium" />}
        onClick={handleHide}
      >
        Wrap sKLIMA
      </MenuButton>
      <div title="Coming soon!">
        <MenuButton
          isActive={pathname === "/offset"}
          icon={<FlipOutlined fontSize="medium" />}
          href="/offset"
          disabled={true}
        >
          Offset
        </MenuButton>
      </div>
    </nav>
  );
};
