import { NextPage } from "next";
import Image from "next/image";
import ForumIcon from "@mui/icons-material/Forum";

import {
  ButtonPrimary,
  Text,
  Section,
  DiscordIcon,
  SnapshotIcon,
} from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";
import { Container } from "../Container";
import { FC } from "react";
import treesDesktop from "public/omar-ram-OicnHt5EahE-unsplash-desktop.jpg";
import mossLogo from "public/moss.png";
import beachDesktop from "public/usgs-JiuVoQd-ZLk-unsplash-desktop.jpg";
import screenShotDesktop from "public/screenshot_discord.png";
import bcfcLogo from "public/bcfc_sm.png";
import bicoWgLogo from "public/bicowg_simple.png";
import gitcoinLogo from "public/gitcoin_logo.png";
import oceandropLogo from "public/oceandrop.svg";
import toucanLogo from "public/toucan_logo.png";
import polygonLogo from "public/polygon-logo.svg";
import openearthLogo from "public/open_earth_black_horizontal.png";
import olympusLogo from "public/olympus_logo.png";
import { urls } from "@klimadao/lib/constants";

const DiscordButton: FC = () => (
  <a
    className={styles.page_discordButton}
    href={urls.discordInvite}
    target="_blank"
    rel="noreferrer noopener"
  >
    <DiscordIcon className={styles.page_discordIcon} />
    <span>|</span>
    <span>Discord</span>
  </a>
);

const SnapshotButton: FC = () => (
  <a
    className={styles.page_baseHeaderButtons}
    href={urls.snapshot}
    target="_blank"
    rel="noreferrer noopener"
  >
    <SnapshotIcon className={styles.page_snapshotIcon} />
    <span>|</span>
    <span>Snapshot</span>
  </a>
);

const ForumButton: FC = () => (
  <a
    className={styles.page_baseHeaderButtons}
    href={urls.forum}
    target="_blank"
    rel="noreferrer noopener"
  >
    <ForumIcon fontSize="large" className={styles.page_forumIcon} />
    <span>|</span>
    <span>Forums</span>
  </a>
);

const HeaderElements: FC = () => (
  <div className={styles.headerElements}>
    <DiscordButton />
    <SnapshotButton />
    <ForumButton />
  </div>
);

export const Community: NextPage = () => (
  <Container
    activePage={"community"}
    title={t`KlimaDAO Community`}
    headline={t`Community`}
    subline={t`KlimaDAO is a Decentralized Autonomous Organization for Change. We are governed and built by a community of passionate Klimates.`}
    mediaTitle={t`KlimaDAO Community`}
    metaDescription={t`Drive climate action and earn rewards with a carbon-backed digital currency.`}
    mediaImageSrc="/og-media.png"
    headerElements={HeaderElements}
  >
    <Section style={{ paddingBottom: "unset" }}>
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h5" align="center">
            <Trans>Let's Work Together</Trans>
          </Text>
          <Text t="h2" as="h2" align="center">
            <Trans>BECOME A PARTNER</Trans>
          </Text>
          <Text t="body3" align="center">
            <Trans>
              We work with traditional carbon market players, crypto platforms,
              corporations and everyone in-between.
            </Trans>
          </Text>
          <ButtonPrimary href={"/contact"} label={"Contact Us"} />
          <Image
            alt={t`Tree grove`}
            src={treesDesktop}
            width={700}
            height={300}
            objectFit="cover"
          />
        </div>
      </div>
    </Section>

    <Section variant="gray">
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h2" as="h2">
            <Trans>OUR PARTNERS</Trans>
          </Text>
        </div>
        <div className={styles.partner_logos}>
          <div className="partner_logo">
            <a href="https://moss.earth/" target="_blank" rel="noreferrer">
              <Image alt={t`MOSS logo`} src={mossLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a href="https://toucan.earth/" target="_blank" rel="noreferrer">
              <Image alt={t`Toucan logo`} src={toucanLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a
              href="https://www.blockchainforclimate.org/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt={t`Blockchain for Climate Foundation logo`}
                src={bcfcLogo}
              />
            </a>
          </div>
          <div className="partner_logo">
            <a
              href="https://twitter.com/BICOWG"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt={t`BICOWG logo`} src={bicoWgLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a
              href="https://polygon.technology/"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt={t`Polygon logo`} src={polygonLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a href="https://oceandrop.art/" target="_blank" rel="noreferrer">
              <Image alt={t`Oceandrop logo`} src={oceandropLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a href="https://gitcoin.co/" target="_blank" rel="noreferrer">
              <Image alt={t`Gitcoin logo`} src={gitcoinLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a
              href="https://www.olympusdao.finance/"
              target="_blank"
              rel="noreferrer"
            >
              <Image alt={t`OlympusDAO logo`} src={olympusLogo} />
            </a>
          </div>
          <div className="partner_logo">
            <a href="https://openearth.org/" target="_blank" rel="noreferrer">
              <Image alt={t`Open Earth logo`} src={openearthLogo} />
            </a>
          </div>
        </div>
      </div>
    </Section>

    <Section className={styles.beachSection}>
      <Image
        src={beachDesktop}
        layout="fill"
        alt="Overhead view of a beach."
        objectFit="cover"
      />
      <Text
        className="beach_label"
        t="h1"
        style={{ color: "white", textTransform: "uppercase" }}
      >
        <Trans>Join the Klima Community</Trans>
      </Text>
    </Section>

    <Section variant="gray">
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h5" align="center">
            <Trans>Come On In</Trans>
          </Text>
          <Text t="h2" as="h2">
            <Trans>Join Our Discord</Trans>
          </Text>
        </div>
        <div className={styles.joinDiscord}>
          <div className="joinDiscord_row1">
            <Text
              t="body3"
              color="lighter"
              align="center"
              className="padding20"
              style={{ maxWidth: "64rem" }}
            >
              <Trans>
                Discord is where we share important announcements, hold
                office-hours, answer questions, and trade memes. Our Discord
                server is extremely active and moderated around-the-clock. We've
                got channels for everything from trading to sustainability and
                carbon markets.
              </Trans>
            </Text>
            <DiscordButton />
          </div>
          <div className="joinDiscord_dummy">
            <Image
              src={screenShotDesktop}
              width={804}
              height={597}
              alt="Screenshot of Discord"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </Section>

    <Section>
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h5" align="center">
            <Trans>Let's Work Together</Trans>
          </Text>
          <Text t="h2" as="h2">
            <Trans>Get in touch?</Trans>
          </Text>
          <Text t="body3" color="lighter" align="center">
            <Trans>
              If you've got questions, ideas, advice or anything else: we can
              help you find the right person to talk to.
            </Trans>
          </Text>
          <ButtonPrimary href={"/contact"} label={"Contact Us"} />
        </div>
      </div>
    </Section>
  </Container>
);
