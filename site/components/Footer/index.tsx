import React, { FC } from "react";
import { Trans } from "@lingui/macro";
import Link from "next/link";

import {
  Anchor as A,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  RedditIcon,
  RSSIcon,
  TelegramIcon,
  TiktokIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import * as styles from "./styles";

export const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer_content}>
      <nav className={styles.footer_nav}>
        <Link href="/">
          <a>
            <Trans id="shared.home">Home</Trans>
          </a>
        </Link>
        <Link href="/buy">
          <a>
            <Trans id="shared.get_klima">Get KLIMA</Trans>
          </a>
        </Link>
        <a href={urls.stake}>
          <Trans id="shared.stake">Stake</Trans>
        </a>
        <a href={urls.bonds}>
          <Trans id="shared.bond">Bond</Trans>
        </a>
        <A href={urls.officialDocs}>
          <Trans id="shared.docs">Docs</Trans>
        </A>
        <Link href="/blog">
          <a>
            <Trans id="shared.blog">Blog</Trans>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <Trans id="shared.contact">Contact</Trans>
          </a>
        </Link>
        <Link href="/disclaimer">
          <a>
            <Trans id="shared.disclaimer">Disclaimer</Trans>
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
        <A href={urls.tiktok}>
          <TiktokIcon />
        </A>
        <A href={urls.linkedIn}>
          <LinkedInIcon />
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
