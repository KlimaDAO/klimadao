import React, { FC } from "react";
import Link from "next/link";
import * as styles from "./styles";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  YoutubeIcon,
  RedditIcon,
  TwitchIcon,
  RSSIcon,
  TelegramIcon,
} from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";

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
      </nav>

      <nav className={styles.footer_icons}>
        <a href={urls.twitter} target="_blank" rel="noreferrer noopener">
          <TwitterIcon />
        </a>
        <a href={urls.youtube} target="_blank" rel="noreferrer noopener">
          <YoutubeIcon />
        </a>
        <a href={urls.discordInvite} target="_blank" rel="noreferrer noopener">
          <DiscordIcon />
        </a>
        <a href={urls.reddit} target="_blank" rel="noreferrer noopener">
          <RedditIcon />
        </a>
        <a href={urls.twitch} target="_blank" rel="noreferrer noopener">
          <TwitchIcon />
        </a>
        <a href={urls.github} target="_blank" rel="noreferrer noopener">
          <GithubIcon />
        </a>
        <a href={urls.telegram} target="_blank" rel="noreferrer noopener">
          <TelegramIcon />
        </a>
        <a href={urls.podcast} target="_blank" rel="noreferrer noopener">
          <RSSIcon />
        </a>
      </nav>
    </div>
  </footer>
);
