import React, { FC, ReactElement } from "react";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import Link from "next/link";

import { LogoWithClaim, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";
import StoreIcon from "@mui/icons-material/Store";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import { Domain } from "@klimadao/lib/types/domains";

import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";

import * as styles from "./styles";

interface AddressProps {
  address?: string;
  domain?: Domain;
}

const Address: FC<AddressProps> = (props) => {
  return (
    <div className={styles.address}>
      <Text t="caption">
        <Trans id="marketplace.menu.wallet_address">Your Wallet Address</Trans>:
      </Text>

      {props.domain ? (
        <div className="domain-wrapper">
          <img
            src={props.domain.imageUrl}
            alt="profile avatar"
            className="avatar"
          />
          <Text t="caption" color="lightest" className={"domain-name"}>
            {props.domain.name}
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
  userAdress: string;
  connectedAddress?: string;
  connectedDomain?: Domain;
  onHide?: () => void;
}

export const NavMenu: FC<Props> = (props) => {
  const { pathname } = useRouter();
  const { isConnectedProfile, isUnconnectedProfile } = useIsMarketplaceProfile(
    props.userAdress
  );

  const isConnected = !!props.connectedAddress || !!props.connectedDomain;

  const profileLink = isConnected
    ? `/marketplace/users/${
        props.connectedDomain?.name || props.connectedAddress
      }`
    : `/marketplace/users/login`;

  return (
    <nav className={styles.container}>
      <Link href="/marketplace" passHref>
        <a>
          <LogoWithClaim />
        </a>
      </Link>
      <div className={styles.addressContainer}>
        <div className="hr" />
        <Address
          domain={props.connectedDomain}
          address={props.connectedAddress}
        />
        <div className="hr" />
      </div>
      <MenuButton
        isActive={
          pathname.startsWith("/marketplace/projects") || isUnconnectedProfile
        }
        href={"/marketplace/projects"}
        icon={<StoreIcon />}
      >
        <Trans id="marketplace.menu.marketplace">Marketplace</Trans>
      </MenuButton>
      <MenuButton
        isActive={
          pathname.startsWith(`/marketplace/users/login`) || isConnectedProfile
        }
        href={profileLink}
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
