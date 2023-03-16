import { cx } from "@emotion/css";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import { FC } from "react";

import {
  Anchor as A,
  LinkedInIcon,
  TwitterIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Text } from "components/Text";
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
              <Trans>Privacy Policy</Trans>
            </Text>
          </Link>
          <Link href="/">
            <Text t="body4">
              <Trans>Terms of Use</Trans>
            </Text>
          </Link>
          <Link href="/">
            <Text t="body4">
              <Trans>Contact</Trans>
            </Text>
          </Link>
          <Link href="/">
            <Text t="body4">
              <Trans>Help</Trans>
            </Text>
          </Link>
          <Link href="/">
            <Text t="body4">
              <Trans>Resources</Trans>
            </Text>
          </Link>
          <Link href={urls.app}>
            <Text t="body4">
              <Trans>KlimaDAO</Trans>
            </Text>
          </Link>
        </nav>
        <nav className={styles.footer_icons}>
          <A href={urls.twitterCarbonmark}>
            <TwitterIcon />
          </A>
          <A href={urls.linkedInCarbonmark}>
            <LinkedInIcon />
          </A>
        </nav>
      </div>
    </footer>
  );
};
