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
          <Link href="/blog/privacy-policy">
            <Text t="body4">
              <Trans>Privacy Policy</Trans>
            </Text>
          </Link>
          <Link href="/blog/terms-of-use">
            <Text t="body4">
              <Trans>Terms of Use</Trans>
            </Text>
          </Link>
          <Link href="https://share-eu1.hsforms.com/1_VneTUObQZmJm4kNcRuEoQg3axk">
            <Text t="body4">
              <Trans>Contact</Trans>
            </Text>
          </Link>
          <Link href="/blog/getting-started">
            <Text t="body4">
              <Trans>Help</Trans>
            </Text>
          </Link>
          <Link href="/resources">
            <Text t="body4">
              <Trans>Resources</Trans>
            </Text>
          </Link>
          <Link href={urls.home}>
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
