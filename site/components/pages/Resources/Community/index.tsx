import { NextPage } from "next";
import Image from "next/image";

import { ButtonPrimary, Text, Section } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import { DiscordIcon } from "components/Icons/DiscordIcon";

import * as styles from "./styles";
import { Container } from "../Container";
import { FC, PropsWithChildren, ReactNode } from "react";
import treesDesktop from "public/omar-ram-OicnHt5EahE-unsplash-desktop.jpg";
import mossLogo from "public/moss.png";
import beachDesktop from "public/usgs-JiuVoQd-ZLk-unsplash-desktop.jpg";
import screenShotDesktop from "public/screen_shot_desktop.jpg";
import bcfcLogo from "public/bcfc_sm.png";
import bicoWgLogo from "public/bicowg_simple.png";
import gitcoinLogo from "public/gitcoin_logo.png";
import oceandropLogo from "public/oceandrop.svg";
import toucanLogo from "public/toucan_logo.png";
import polygonLogo from "public/polygon-logo.svg";
import openearthLogo from "public/open_earth_black_horizontal.png";
import olympusLogo from "public/olympus_logo.png";
import { urls } from "@klimadao/lib/constants";

export type Props = HTMLHtmlElement;

const DiscordButton: FC<PropsWithChildren<ReactNode>> = () => (
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

export const Community: NextPage<Props> = ({}) => {
  return (
    <Container
      activePage={"community"}
      title={t`KlimaDAO Community`}
      headline={t`Community`}
      subline={t`KlimaDAO harnesses the power of cryptocurrency, blockchain and smart
      contracts to create.`}
      mediaTitle={t`KlimaDAO Community`}
      metaDescription={t`Drive climate action and earn rewards with a carbon-backed digital currency.`}
      mediaImageSrc="/og-media.jpg"
      headerElements={DiscordButton}
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
            <Text t="body2" align="center">
              <Trans>
                KlimaDAO harnesses the power of cryptocurrency, blockchain and
                smart contracts to create
              </Trans>
            </Text>
            <ButtonPrimary href={"/resources/contact"} label={"Contact Us"} />
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
            <Text t="h5" align="center">
              <Trans>Let's Work Together</Trans>
            </Text>
            <Text t="h2" as="h2">
              <Trans>OUR PARTNERS</Trans>
            </Text>
          </div>
          <div className={styles.partner_logos}>
            <div className="partner_logo">
              <Image alt={t`MOSS logo`} src={mossLogo} />
            </div>
            <div className="partner_logo">
              <Image alt={t`Toucan logo`} src={toucanLogo} />
            </div>
            <div className="partner_logo">
              <Image
                alt={t`Blockchain for Climate Foundation logo`}
                src={bcfcLogo}
              />
            </div>
            <div className="partner_logo">
              <Image alt={t`BICOWG logo`} src={bicoWgLogo} />
            </div>
            <div className="partner_logo">
              <Image alt={t`Polygon logo`} src={polygonLogo} />
            </div>
            <div className="partner_logo">
              <Image alt={t`Oceandrop logo`} src={oceandropLogo} />
            </div>
            <div className="partner_logo">
              <Image alt={t`Gitcoin logo`} src={gitcoinLogo} />
            </div>
            <div className="partner_logo">
              <Image alt={t`OlympusDAO logo`} src={olympusLogo} />
            </div>
            <div className="partner_logo">
              <Image alt={t`Open Earth logo`} src={openearthLogo} />
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
              <Trans>Let's Work Together</Trans>
            </Text>
            <Text t="h2" as="h2">
              <Trans>Join Our Discord</Trans>
            </Text>
          </div>
        </div>
        <div className={styles.joinDiscord}>
          <div className="joinDiscord_col1">
            <Text t="h2" as="h2">
              <Trans>Discord</Trans>
            </Text>
            <Text t="body2" color="lighter">
              <Trans>
                KlimaDAO harnesses the power of cryptocurrency, blockchain and
                smart contracts to create
              </Trans>
            </Text>
            <DiscordButton />
          </div>
          <div className="joinDiscord_col2">
            <div className="joinDiscord_dummy">
              <Image
                src={screenShotDesktop}
                width={764}
                height={600}
                alt="Screen shot of Discord"
                layout="responsive"
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
            <Text t="body2" color="lighter" align="center">
              <Trans>
                KlimaDAO harnesses the power of cryptocurrency, blockchain and
                smart contracts to create
              </Trans>
            </Text>
            <ButtonPrimary href={"/resources/contact"} label={"Contact Us"} />
          </div>
        </div>
      </Section>
    </Container>
  );
};
