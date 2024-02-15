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
      <nav className={styles.footerNav}>
        <Link href="/blog/privacy-policy">
          <Trans>Privacy Policy</Trans>
        </Link>
        <Link href="/blog/terms-of-use">
          <Trans>Terms of Use</Trans>
        </Link>
        <Link href="/blog/code-of-ethics">
          <Trans>Code of Ethics</Trans>
        </Link>
        <Link href={carbonmarkUrls.docs}>
          <Trans>Help</Trans>
        </Link>
        <Link href="/resources">
          <Trans>Resources</Trans>
        </Link>
        <Link href={urls.home}>
          <Trans>KlimaDAO</Trans>
        </Link>
        <Link href={urls.carbonmarkContactForm}>
          <Trans>Contact</Trans>
        </Link>
      </nav>
      <nav className={styles.footerIcons}>
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
    </footer>
  );
};
