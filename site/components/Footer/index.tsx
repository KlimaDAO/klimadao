import React, { FC } from "react";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import * as styles from "./styles";

import {
  Anchor as A,
  DiscordIcon,
  GithubIcon,
  RedditIcon,
  RSSIcon,
  TelegramIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer_content}>
      <nav className={styles.footer_nav}>
        <Link href="/">
          <a>
            <Trans>Home</Trans>
          </a>
        </Link>
        <Link href="/buy">
          <a>
            <Trans>Get KLIMA</Trans>
          </a>
        </Link>
        <a href={urls.stake}>
          <Trans>Stake</Trans>
        </a>
        <a href={urls.bonds}>
          <Trans>Bond</Trans>
        </a>
        <a href={urls.officialDocs} target="_blank" rel="noreferrer noopener">
          <Trans>Docs</Trans>
        </a>
        <Link href="/blog">
          <a>
            <Trans>Blog</Trans>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <Trans>Contact</Trans>
          </a>
        </Link>
        <Link href="/disclaimer">
          <a>
            <Trans>Disclaimer</Trans>
          </a>
        </Link>
      </nav>

      <nav className={styles.footer_icons}>
        <A href={urls.twitter}>
          <TwitterIcon />
        </A>
        <A href={urls.youtube}>
          <YoutubeIcon />
        </A>
        <A href={urls.discordInvite}>
          <DiscordIcon />
        </A>
        <A href={urls.reddit}>
          <RedditIcon />
        </A>
        <A href={urls.twitch}>
          <TwitchIcon />
        </A>
        <A href={urls.github}>
          <GithubIcon />
        </A>
        <A href={urls.telegram}>
          <TelegramIcon />
        </A>
        <A href={urls.podcast}>
          <RSSIcon />
        </A>
      </nav>
    </div>
  </footer>
);
