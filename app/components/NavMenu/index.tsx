import React, { FC, ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Anchor as A,
  DiscordIcon,
  GithubIcon,
  LogoWithClaim,
  RedditIcon,
  RSSIcon,
  TelegramIcon,
  Text,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { concatAddress } from "@klimadao/lib/utils";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";
import FlipOutlined from "@mui/icons-material/FlipOutlined";
import Payment from "@mui/icons-material/Payment";
import SpaOutlined from "@mui/icons-material/SpaOutlined";

import * as styles from "./styles";
import { useSelector } from "react-redux";
import { selectBalances } from "state/selectors";
import { MenuBookOutlined } from "@mui/icons-material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

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
  const balances = useSelector(selectBalances);
  const { pathname } = useLocation();

  const handleHide = () => {
    props.onHide?.();
  };

  return (
    <nav className={styles.container}>
      <a href={urls.home}>
        <LogoWithClaim />
      </a>
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
        isActive={false}
        href={urls.buy}
        icon={<Payment />}
        onClick={handleHide}
      >
        Buy KLIMA
      </MenuButton>
      <MenuButton
        isActive={pathname === "/stake"}
        href="/stake"
        icon={<LibraryAddOutlined />}
        onClick={handleHide}
      >
        Stake KLIMA
      </MenuButton>
      <MenuButton
        isActive={pathname.includes("/bond")}
        href="/bonds"
        icon={<SpaOutlined />}
        onClick={handleHide}
      >
        Bond Carbon
      </MenuButton>
      <MenuButton
        isActive={pathname === "/wrap"}
        href="/wrap"
        icon={<FlipOutlined />}
        onClick={handleHide}
      >
        Wrap sKLIMA
      </MenuButton>
      <MenuButton
        isActive={pathname === "/info"}
        href="/info"
        icon={<InfoOutlined />}
        onClick={handleHide}
      >
        Info
      </MenuButton>
      <div className="labelStack" title="Coming soon!">
        <Text t="badge" color="lightest">
          COMING SOON
        </Text>
        <MenuButton
          isActive={pathname === "/offset"}
          icon={<FlipOutlined />}
          href="/offset"
          disabled={true}
        >
          Offset
        </MenuButton>
      </div>
      {!!Number(balances?.pklima) && (
        <div className="labelStack">
          <Text t="badge" color="lightest">
            ⭐ JUST FOR YOU
          </Text>
          <MenuButton
            isActive={pathname === "/pklima"}
            icon={<FlipOutlined />}
            href="/pklima"
          >
            pKLIMA
          </MenuButton>
        </div>
      )}
      <div className="navFooter">
        <div className="hr" />
        <div className="navFooter_buttons">
          <A className="navFooter_button" href={urls.twitter}>
            <TwitterIcon />
          </A>
          <A className="navFooter_button" href={urls.youtube}>
            <YoutubeIcon />
          </A>
          <A className="navFooter_button" href={urls.discordInvite}>
            <DiscordIcon />
          </A>
          <A className="navFooter_button" href={urls.reddit}>
            <RedditIcon />
          </A>
          <A className="navFooter_button" href={urls.twitch}>
            <TwitchIcon />
          </A>
          <A className="navFooter_button" href={urls.github}>
            <GithubIcon />
          </A>
          <A className="navFooter_button" href={urls.telegram}>
            <TelegramIcon />
          </A>
          <A className="navFooter_button" href={urls.podcast}>
            <RSSIcon />
          </A>
          <A className="navFooter_button" href={urls.officialDocs}>
            <MenuBookOutlined />
          </A>
        </div>
      </div>
    </nav>
  );
};
