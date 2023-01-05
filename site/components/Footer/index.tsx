import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import { createLinkWithLocaleQuery } from "lib/i18n";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import {
  Anchor as A,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  RedditIcon,
  RSSIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import * as styles from "./styles";

interface Props {
  className?: string;
  transparent?: boolean;
}

export const Footer: FC<Props> = (props) => {
  const { locale } = useRouter();
  return (
    <footer className={cx(styles.footer(props.transparent), props.className)}>
      <div className={cx(styles.footer_content, "footer_content")}>
        <nav className={cx(styles.footer_nav, "footer_nav")}>
          <Link href="/">
            <Trans id="shared.home">Home</Trans>
          </Link>
          <Link href="/buy">
            <Trans id="shared.buy">Buy</Trans>
          </Link>
          <a href={createLinkWithLocaleQuery(urls.stake, locale)}>
            <Trans id="shared.stake">Stake</Trans>
          </a>
          <a href={createLinkWithLocaleQuery(urls.app, locale)}>
            <Trans id="shared.bond">App</Trans>
          </a>
          <A href={urls.officialDocs}>
            <Trans id="shared.docs">Docs</Trans>
          </A>
          <Link href="/blog">
            <Trans id="shared.blog">Blog</Trans>
          </Link>
          <Link href="/contact">
            <Trans id="shared.contact">Contact</Trans>
          </Link>
          <Link href="/disclaimer">
            <Trans id="shared.disclaimer">Disclaimer</Trans>
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
          <A href={urls.github}>
            <GithubIcon />
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
};
