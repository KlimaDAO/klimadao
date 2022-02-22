import { FC } from "react";
import { NextPage } from "next";
import Image from "next/image";
import ForumIcon from "@mui/icons-material/Forum";
import { Trans, t } from "@lingui/macro";
import { urls } from "@klimadao/lib/constants";
import {
  Anchor as A,
  ButtonPrimary,
  Text,
  Section,
  DiscordIcon,
  SnapshotIcon,
} from "@klimadao/lib/components";
import bcfcLogo from "public/logo-bcfc.png";
import beachImage from "public/bg-beach.jpg";
import bicoWgLogo from "public/logo-bicowg.png";
import discordImage from "public/bg-discord.png";
import gitcoinLogo from "public/logo-gitcoin.png";
import mossLogo from "public/logo-moss.png";
import oceandropLogo from "public/logo-oceandrop.svg";
import olympusLogo from "public/logo-olympus.png";
import openEarthLogo from "public/logo-open-earth.png";
import polygonLogo from "public/logo-polygon.svg";
import toucanLogo from "public/logo-toucan.png";
import treeGroveImage from "public/bg-tree-grove.jpg";

import * as styles from "./styles";
import { Container } from "../Container";

const DiscordButton: FC = () => (
  <A className={styles.page_discordButton} href={urls.discordInvite}>
    <DiscordIcon className={styles.page_discordIcon} />
    <span>|</span>
    <span>Discord</span>
  </A>
);

const SnapshotButton: FC = () => (
  <A className={styles.page_baseHeaderButtons} href={urls.snapshot}>
    <SnapshotIcon className={styles.page_snapshotIcon} />
    <span>|</span>
    <span>Snapshot</span>
  </A>
);

const ForumButton: FC = () => (
  <A className={styles.page_baseHeaderButtons} href={urls.forum}>
    <ForumIcon fontSize="large" className={styles.page_forumIcon} />
    <span>|</span>
    <span>Forums</span>
  </A>
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
            src={treeGroveImage}
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
            <A href="https://moss.earth/">
              <Image alt={t`MOSS logo`} src={mossLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://toucan.earth/">
              <Image alt={t`Toucan logo`} src={toucanLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://www.blockchainforclimate.org/">
              <Image
                alt={t`Blockchain for Climate Foundation logo`}
                src={bcfcLogo}
              />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://twitter.com/BICOWG">
              <Image alt={t`BICOWG logo`} src={bicoWgLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://polygon.technology/">
              <Image alt={t`Polygon logo`} src={polygonLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://oceandrop.art/">
              <Image alt={t`Oceandrop logo`} src={oceandropLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://gitcoin.co/">
              <Image alt={t`Gitcoin logo`} src={gitcoinLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://www.olympusdao.finance/">
              <Image alt={t`OlympusDAO logo`} src={olympusLogo} />
            </A>
          </div>
          <div className="partner_logo">
            <A href="https://openearth.org/">
              <Image alt={t`Open Earth logo`} src={openEarthLogo} />
            </A>
          </div>
        </div>
      </div>
    </Section>

    <Section className={styles.beachSection}>
      <Image
        src={beachImage}
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
              src={discordImage}
              width={600}
              height={307}
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
