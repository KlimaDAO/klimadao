import { cx } from "@emotion/css";
import {
  Anchor as A,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import Link from "next/link";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  className?: string;
  transparent?: boolean;
}

export const Footer: FC<Props> = (props) => {
  return (
    <footer className={cx(styles.footer(props.transparent), props.className)}>
      <div className={cx(styles.footer_content, "footer_content")}>
        <nav className={cx(styles.footer_nav, "footer_nav")}>
          <Link href="/">
            <Text t="body4">
              <Trans>Home</Trans>
            </Text>
          </Link>
          <Link href="/projects">
            <Text t="body4">
              <Trans>Marketplace</Trans>
            </Text>
          </Link>
          <Link href="/users/login">
            <Text t="body4">
              <Trans>Profile</Trans>
            </Text>
          </Link>
          <Link href="/resources">
            <Text t="body4">
              <Trans>Resources</Trans>
            </Text>
          </Link>
        </nav>

        <nav className={styles.footer_icons}>
          <A href={urls.twitterCarbonmark}>
            <TwitterIcon />
          </A>
          <A href={urls.discordInvite}>
            <DiscordIcon />
          </A>
          <A href={urls.github}>
            <GithubIcon />
          </A>
          <A href={urls.linkedInCarbonmark}>
            <LinkedInIcon />
          </A>
        </nav>
      </div>
    </footer>
  );
};
