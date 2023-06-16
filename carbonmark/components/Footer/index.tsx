import { cx } from "@emotion/css";
import {
  Anchor as A,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Text } from "components/Text";
import { urls as carbonmarkUrls } from "lib/constants";
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
          <Link href={carbonmarkUrls.docs}>
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
          <Link href={urls.carbonmarkContactForm}>
            <Text t="body4">
              <Trans>Contact</Trans>
            </Text>
          </Link>
        </nav>
        <nav className={styles.footer_icons}>
          <A href={urls.twitterCarbonmark}>
            <TwitterIcon />
          </A>
          <A href={urls.github}>
            <GithubIcon />
          </A>
          <A href={urls.linkedInCarbonmark}>
            <LinkedInIcon />
          </A>
          <A href={urls.carbonmarkEmail}>
            <EmailRoundedIcon />
          </A>
        </nav>
      </div>
    </footer>
  );
};
