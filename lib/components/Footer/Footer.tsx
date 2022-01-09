import React, { FC } from "react";
import * as styles from "./styles";

import { TwitterIcon, GithubIcon } from "@klimadao/lib/components";

import { urls } from "@klimadao/lib/constants";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <nav className={styles.footer_nav}>
          <a href={urls.home}>Klima Dao</a>
          <a href={urls.tutorial}>Buy Klima</a>
          <a href={urls.stake}>Stake</a>
          <a href={urls.bond}>Bond</a>
          <a href={urls.officialDocs}>Docs</a>
          <a href={urls.discordInvite}>Join Klima</a>
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
