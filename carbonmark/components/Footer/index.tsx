import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
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
            <Trans>Home</Trans>
          </Link>
          <Link href="/projects">
            <Trans>Marketplace</Trans>
          </Link>
          <Link href="/users/login">
            <Trans>Profile</Trans>
          </Link>
          <Link href="/resources">
            <Trans>Resources</Trans>
          </Link>
        </nav>

        <nav className={styles.footer_icons}>
          <Text t="caption">
            Built with 🌳 by <a href="https://klimadao.finance">KlimaDAO</a>
          </Text>
        </nav>
      </div>
    </footer>
  );
};
