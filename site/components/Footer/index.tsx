import React, { FC } from "react";
import Link from "next/link";
import * as styles from "./styles";

import { TwitterIcon, GithubIcon } from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <nav className={styles.footer_nav}>
          <Link href="/">
            <a>
              <Trans>Home</Trans>
            </a>
          </Link>
          <a href={urls.tutorial} target="_blank" rel="noreferrer noopener">
            <Trans>Get Klima</Trans>
          </a>
          <a href={urls.stake}>
            <Trans>Stake</Trans>
          </a>
          <a href={urls.bond}>
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
          <a href={urls.github} target="_blank" rel="noreferrer noopener">
            <GithubIcon />
          </a>
        </nav>
      </div>
    </footer>
  );
};
