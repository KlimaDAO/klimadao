import { NextPage } from "next";
import Image, { StaticImageData } from "next/legacy/image";
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
import deltaWaveLogo from "public/logo-delta-wave.svg";
import discordImage from "public/bg-discord.png";
import dovuLogo from "public/logo-dovu.png";
import digitalCharityArtLogo from "public/logo-digital-charity-art.png";
import ecoLogo from "public/logo-eco.png";
import etcGroupLogo from "public/logo-etc-group.png";
import gitcoinLogo from "public/logo-gitcoin.png";
import landxLogo from "public/logo-landx.png";
import mossLogo from "public/logo-moss.png";
import oceandropLogo from "public/logo-oceandrop.svg";
import offsetraLogo from "public/logo-offsetra.png";
import olympusLogo from "public/logo-olympus.png";
import openEarthLogo from "public/logo-open-earth.png";
import polygonLogo from "public/logo-polygon.svg";
import thoughtForFoodLogo from "public/logo-thought-for-food.png";
import toucanLogo from "public/logo-toucan.png";
import treeGroveImage from "public/bg-tree-grove.jpg";

import * as styles from "./styles";
import { Container } from "../Container";
import { getImageSizes } from "@klimadao/lib/utils";

const DiscordButton = () => (
  <A className={styles.page_discordButton} href={urls.discordInvite}>
    <DiscordIcon className={styles.page_discordIcon} />
    <span>|</span>
    <span>Discord</span>
  </A>
);

const SnapshotButton = () => (
  <A className={styles.page_baseHeaderButtons} href={urls.snapshot}>
    <SnapshotIcon className={styles.page_snapshotIcon} />
    <span>|</span>
    <span>Snapshot</span>
  </A>
);

const ForumButton = () => (
  <A className={styles.page_baseHeaderButtons} href={urls.forum}>
    <ForumIcon fontSize="large" className={styles.page_forumIcon} />
    <span>|</span>
    <span>Forums</span>
  </A>
);

const HeaderElements = () => (
  <div className={styles.headerElements}>
    <DiscordButton />
    <SnapshotButton />
    <ForumButton />
  </div>
);

type LogoProps = {
  alt: string;
  href: string;
  src: StaticImageData;
};
const Logo = (props: LogoProps) => (
  <div className="partner_logo">
    <A href={props.href}>
      <Image
        alt={props.alt}
        src={props.src}
        width={150}
        height={50}
        objectFit={"contain"}
      />
    </A>
  </div>
);

export const Community: NextPage = () => (
  <Container
    activePage={"community"}
    title={t({ id: "community.head.title", message: "KlimaDAO Community" })}
    headline={t({ id: "community.head.headline", message: "Community" })}
    subline={t({
      id: "community.head.subline",
      message:
        "KlimaDAO is a Decentralized Autonomous Organization for Change. We are governed and built by a community of passionate Klimates.",
    })}
    mediaTitle={t({ id: "community.head.title" })}
    metaDescription={t({
      id: "community.head.metadescription",
      message: "Learn about our community of passionate Klimates",
    })}
    mediaImageSrc={urls.mediaImage}
    headerElements={<HeaderElements />}
  >
    <Section style={{ paddingBottom: "unset" }}>
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h5" align="center">
            <Trans id="community.lets_work_together">Let's Work Together</Trans>
          </Text>
          <Text t="h2" as="h2" align="center">
            <Trans id="community.become_a_partner">BECOME A PARTNER</Trans>
          </Text>
          <Text t="body3" align="center">
            <Trans
              id="community.we_work_with_traditionnal"
              comment="Long sentence"
            >
              We work with traditional carbon market players, crypto platforms,
              corporations and everyone in-between.
            </Trans>
          </Text>
          <ButtonPrimary
            href={"/contact"}
            label={t({ id: "shared.contact_us", message: "Contact Us" })}
          />
          <Image
            alt={t({
              id: "community.tree_grove",
              message: `Tree grove`,
            })}
            src={treeGroveImage}
            width={700}
            height={300}
            objectFit="cover"
            placeholder="blur"
            sizes={getImageSizes({ large: "700px" })}
          />
        </div>
      </div>
    </Section>

    <Section variant="gray">
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h2" as="h2">
            <Trans id="community.our_partners">OUR PARTNERS</Trans>
          </Text>
        </div>
        <div className={styles.partner_logos}>
          <Logo
            alt={t({
              id: "community.moss_logo",
              message: `Moss logo`,
            })}
            href="https://moss.earth"
            src={mossLogo}
          />
          <Logo
            alt={t({
              id: "community.toucan_logo",
              message: `Toucan logo`,
            })}
            href="https://toucan.earth"
            src={toucanLogo}
          />
          <Logo
            alt={t({
              id: "community.blockchainforclimatefondation_logo",
              message: `Blockchain for Climate Foundation logo`,
            })}
            href="https://www.blockchainforclimate.org"
            src={bcfcLogo}
          />
          <Logo
            alt={t({
              id: "community.bigcowg_logo",
              message: `BICOWG logo`,
            })}
            href="https://twitter.com/BICOWG"
            src={bicoWgLogo}
          />
          <Logo
            alt={t({
              id: "community.polygon_logo",
              message: `Polygon logo`,
            })}
            href="https://polygon.technology"
            src={polygonLogo}
          />
          <Logo
            alt={t({
              id: "community.oceandrop_logo",
              message: `Oceandrop logo`,
            })}
            href="https://oceandrop.art"
            src={oceandropLogo}
          />
          <Logo
            alt={t({
              id: "community.gitcoin_logo",
              message: `Gitcoin logo`,
            })}
            href="https://gitcoin.co"
            src={gitcoinLogo}
          />
          <Logo
            alt={t({
              id: "community.olympusdao_logo",
              message: `OlympusDAO logo`,
            })}
            href="https://www.olympusdao.finance"
            src={olympusLogo}
          />
          <Logo
            alt={t({
              id: "community.openearth_logo",
              message: `Open Earth logo`,
            })}
            href="https://openearth.org"
            src={openEarthLogo}
          />
          <Logo
            alt={t({
              id: "community.deltawave_logo",
              message: `Delta Wave logo`,
            })}
            href="https://www.deltawave.energy"
            src={deltaWaveLogo}
          />
          <Logo
            alt={t({
              id: "community.etcgroup_logo",
              message: `Etc Group logo`,
            })}
            href="https://etc-group.com"
            src={etcGroupLogo}
          />
          <Logo
            alt={t({ id: "community.dovu_logo", message: `Dovu logo` })}
            href="https://dovu.earth"
            src={dovuLogo}
          />
          <Logo
            alt={t({
              id: "community.eco_logo",
              message: `Eco logo`,
            })}
            href="https://eco.com"
            src={ecoLogo}
          />
          <Logo
            alt={t({
              id: "community.offsetra_logo",
              message: `Offsetra logo`,
            })}
            href="https://offsetra.com"
            src={offsetraLogo}
          />
          <Logo
            alt={t({
              id: "community.digitalcharityart_logo",
              message: `Digital Charity Art logo`,
            })}
            href="https://www.digitalcharityart.co.nz"
            src={digitalCharityArtLogo}
          />
          <Logo
            alt={t({
              id: "community.toughtforfood_logo",
              message: `Thought for Food logo`,
            })}
            href="https://thoughtforfood.org"
            src={thoughtForFoodLogo}
          />
          <Logo
            alt={t({
              id: "community.landx_logo",
              message: `LandX logo`,
            })}
            href="https://landx.fi"
            src={landxLogo}
          />
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
        <Trans id="community.join_the_klima_community">
          Join the Klima Community
        </Trans>
      </Text>
    </Section>

    <Section variant="gray">
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h5" align="center">
            <Trans id="community.come_on_in">Come On In</Trans>
          </Text>
          <Text t="h2" as="h2">
            <Trans id="community.join_our_discord">Join Our Discord</Trans>
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
              <Trans
                id="community.discord_is_where_we_share"
                comment="Long sentence"
              >
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
              alt="Screenshot of Discord"
              placeholder="blur"
              sizes={getImageSizes({ large: "576px" })}
            />
          </div>
        </div>
      </div>
    </Section>

    <Section>
      <div className={styles.communityContainer}>
        <div className={styles.community_textGroup}>
          <Text t="h5" align="center">
            <Trans id="community.lets_work_together">Let's Work Together</Trans>
          </Text>
          <Text t="h2" as="h2">
            <Trans id="community.get_in_touch">Get in touch?</Trans>
          </Text>
          <Text t="body3" color="lighter" align="center">
            <Trans
              id="community.if_you_ve_got_questions"
              comment="Long sentence"
            >
              If you've got questions, ideas, advice or anything else: we can
              help you find the right person to talk to.
            </Trans>
          </Text>
          <ButtonPrimary
            href={"/contact"}
            label={t({ id: "shared.contact_us", message: "Contact Us" })}
          />
        </div>
      </div>
    </Section>
  </Container>
);
