import { NextPage } from "next";
import Image from "next/image";

import { cx } from "@emotion/css";

import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import { DiscordIcon } from "components/Icons/DiscordIcon";

import * as styles from "./styles";
import { Container } from "../Container";
import { FC, PropsWithChildren, ReactNode } from "react";
import trees from "public/omar-ram-OicnHt5EahE-unsplash.jpg";
import treesDesktop from "public/omar-ram-OicnHt5EahE-unsplash-desktop.jpg";
import mossLogo from "public/moss.png";
import beach from "public/usgs-JiuVoQd-ZLk-unsplash-mobile.jpg";
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

export type Props = HTMLHtmlElement;

const DiscordButton: FC<PropsWithChildren<ReactNode>> = () => (
  <button className={styles.page_discordButton}>
    <DiscordIcon className={styles.page_discordIcon} />
    <span>|</span>
    <span>Discord</span>
  </button>
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
      <div className={styles.communityContainer}>
        <div
          className={cx(
            styles.page_section,
            styles.page_pb_0,
            styles.page_section_pt_Lg
          )}
        >
          <span className={styles.page_eyebrow}>
            <Trans>Let's Work Together</Trans>
          </span>
          <h2 className={styles.page_h2}>
            <Trans>
              Become<span>&nbsp;</span>
              <br />a Partner
            </Trans>
          </h2>
          <p className={styles.page_paragraph}>
            KlimaDAO harnesses the power of cryptocurrency, blockchain and smart
            contracts to create
          </p>
          <ButtonPrimary
            className={styles.page_ctaButton}
            href={"/resources/contact"}
            label={"Contact Us"}
          />
          <div className={styles.page_imageContainer}>
            <div className={styles.page_image}>
              <Image
                alt={t`Tree grove`}
                src={trees}
                width={300}
                height={300}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
              />
            </div>
            <div className={cx(styles.page_image, styles.page_imageDesktop)}>
              <Image
                alt={t`Tree grove`}
                src={treesDesktop}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className={cx(styles.page_section, styles.section_partnerLogos)}>
          <span className={styles.page_eyebrow}>
            <Trans>Let's Work Together</Trans>
          </span>
          <h2 className={cx(styles.page_h2, styles.page_h2_mb_Lg)}>
            <Trans>Our Partners</Trans>
          </h2>
          <div className={styles.section_partnerLogos_imageContainer}>
            <div>
              <Image
                className={styles.page_image}
                alt={t`MOSS logo`}
                src={mossLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`Toucan logo`}
                src={toucanLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`Blockchain for Climate Foundation logo`}
                src={bcfcLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`BICOWG logo`}
                src={bicoWgLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`Polygon logo`}
                src={polygonLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`Oceandrop logo`}
                src={oceandropLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`Gitcoin logo`}
                src={gitcoinLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`OlympusDAO logo`}
                src={olympusLogo}
                objectFit="contain"
              />
            </div>
            <div>
              <Image
                className={styles.page_image}
                alt={t`Open Earth logo`}
                src={openearthLogo}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className={styles.page_imageSection}>
          <div className={styles.page_backingImage}>
            <Image src={beach} alt="Overhead view of a beach." />
          </div>
          <div className={styles.page_backingImage_desktop}>
            <Image
              src={beachDesktop}
              alt="Overhead view of a beach."
              layout="responsive"
            />
          </div>
          <div className={styles.page_overlayTextWrapper}>
            <div className={styles.page_overlayTextContainer}>
              <p className={styles.page_overlayText}>
                Join the
                <br />
                Klima
                <br />
                Community
              </p>
            </div>
          </div>
        </div>
        <div
          className={cx(
            styles.page_section,
            styles.page_bgGray,
            styles.page_section_pt_Lg
          )}
        >
          <span className={styles.page_eyebrow}>
            <Trans>Let's Work Together</Trans>
          </span>
          <h2
            className={cx(
              styles.page_h2,
              styles.page_h2_mb_Lg,
              styles.page_desktopOnly
            )}
          >
            <Trans>Join Our Discord</Trans>
          </h2>
          <div className={styles.page_roundedBox}>
            <div className={styles.page_roundedBoxTextContainer}>
              <h2 className={styles.page_h2}>Discord</h2>
              <p>
                <Trans>
                  KlimaDAO harnesses the power of cryptocurrency, blockchain and
                  smart contracts to create
                </Trans>
              </p>
              <DiscordButton />
            </div>
            <div className={styles.page_screenShot}>
              <Image
                alt="Screen shot of Discord"
                src={screenShotDesktop}
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className={styles.page_section}>
          <span className={styles.page_eyebrow}>
            <Trans>Let's Work Together</Trans>
          </span>
          <h2 className={styles.page_h2}>
            <Trans>
              Get in
              <br />
              Touch?
            </Trans>
          </h2>
          <p className={styles.page_paragraph}>
            <Trans>
              KlimaDAO harnesses the power of cryptocurrency, blockchain and
              smart contracts to create
            </Trans>
          </p>
          <ButtonPrimary
            className={styles.page_ctaButton}
            href={"/resources/contact"}
            label={"Contact Us"}
          />
        </div>
      </div>
    </Container>
  );
};
