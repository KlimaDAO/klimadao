import React, { FC, ReactElement } from "react";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import { useRouter } from "next/router";

import { LogoWithClaim, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";
import StoreIcon from "@mui/icons-material/Store";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";

import * as styles from "./styles";

export interface Domain {
  name: string;
  imageUrl: string;
}

interface AddressProps {
  address: string | undefined;
  domains?: {
    knsDomain: Domain;
    ensDomain: Domain;
  };
}

const Address: FC<AddressProps> = (props) => {
  const domain = props.domains?.knsDomain || props.domains?.ensDomain;

  return (
    <div className={styles.address}>
      <Text t="caption">
        <Trans id="marketplace.menu.wallet_address">Your Wallet Address</Trans>:
      </Text>

      {domain ? (
        <div className="domain-wrapper">
          <img src={domain.imageUrl} alt="profile avatar" className="avatar" />
          <Text t="caption" color="lightest" className={"domain-name"}>
            {domain.name}
          </Text>
        </div>
      ) : (
        <Text t="caption" color="lightest">
          {props.address ? (
            concatAddress(props.address)
          ) : (
            <Trans id="marketplace.menu.not_connected">NOT CONNECTED</Trans>
          )}
        </Text>
      )}
    </div>
  );
};

interface MenuButtonProps {
  icon: ReactElement;
  href: string;
  isActive: boolean;
  disabled?: boolean;
}

const MenuButton: FC<MenuButtonProps> = (props) => {
  if (props.disabled) {
    return (
      <div
        className={styles.sidebarButton}
        data-active={props.isActive}
        data-disabled={true}
      >
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </div>
    );
  }

  return (
    <Link href={props.href} passHref>
      <a className={styles.sidebarButton} data-active={props.isActive}>
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </a>
    </Link>
  );
};

interface Props {
  address?: string;
  onHide?: () => void;
  domains?: {
    knsDomain: Domain;
    ensDomain: Domain;
  };
}

export const NavMenu: FC<Props> = (props) => {
  const isConnected = !!props.address || !!props.domains;
  const { pathname } = useRouter();

  return (
    <nav className={styles.container}>
      <a href="/">
        <LogoWithClaim />
      </a>
      <div className={styles.addressContainer}>
        <div className="hr" />
        <Address domains={props.domains} address={props.address} />
        <div className="hr" />
      </div>
      <MenuButton
        isActive={pathname.startsWith("/marketplace/projects")}
        href={"/marketplace/projects"}
        icon={<StoreIcon />}
      >
        <Trans id="marketplace.menu.marketplace">Marketplace</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname.startsWith("/marketplace/users")}
        href="/marketplace/users"
        icon={<PermIdentityIcon />}
      >
        <Trans id="marketplace.menu.profile">Profile</Trans>
      </MenuButton>
      {isConnected && (
        <MenuButton
          isActive={pathname.startsWith("/marketplace/portfolio")}
          href="/marketplace/portfolio"
          icon={<ViewQuiltOutlinedIcon />}
        >
          <Trans id="marketplace.menu.portfolio">Portfolio</Trans>
        </MenuButton>
      )}

      <div className="navFooter">
        <div className="hr" />
        <div className="navFooter_buttons"></div>
      </div>
    </nav>
  );
};
