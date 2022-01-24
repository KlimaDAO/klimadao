import { NextPage } from "next";
import Image from "next/image";

import { cx } from "@emotion/css";

import { ButtonPrimary } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import { DiscordIcon } from "components/Icons/DiscordIcon";

import * as styles from "./styles";
import { Container } from "../Container";
import { FC, PropsWithChildren, ReactNode } from "react";
import trees from "../../../../public/omar-ram-OicnHt5EahE-unsplash.jpg";
import mossLogo from "../../../../public/moss.png";
import beach from "../../../../public/usgs-JiuVoQd-ZLk-unsplash-mobile.jpg";
import screenShot from "../../../../public/screen_shot.jpg";

export type Props = HTMLHtmlElement;

const TopElement: FC<PropsWithChildren<ReactNode>> = () => (
  <div
    className={cx(
      styles.page_section,
      styles.page_topElement,
      styles.page_bgGray
    )}
  >
    <h1 className={styles.page_h1}>
      <Trans>Community</Trans>
    </h1>
    <p className={styles.page_paragraph}>
      <Trans>
        KlimaDAO harnesses the power of cryptocurrency, blockchain and smart
        contracts to create.
      </Trans>
    </p>
  </div>
);

export const Community: NextPage<Props> = ({}) => {
  return (
    <Container
      activePage={"community"}
      title={t`KlimaDAO Community`}
      mediaTitle={t`KlimaDAO Community`}
      metaDescription={t`Drive climate action and earn rewards with a carbon-backed digital currency.`}
      mediaImageSrc="/og-media.jpg"
      topMobileElement={TopElement}
    >
      <div className={styles.page_section}>
        <span className={styles.page_eyebrow}>
          <Trans>Let's Work Together</Trans>
        </span>
        <h2 className={styles.page_h2}>
          <Trans>
            Become
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
          <Image
            className={styles.page_image}
            alt={t`Tree grove`}
            src={trees}
            layout="responsive"
            objectFit="cover"
            placeholder="blur"
          />
        </div>
      </div>
      <div className={cx(styles.page_section, styles.page_bgGray)}>
        <span className={styles.page_eyebrow}>
          <Trans>Let's Work Together</Trans>
        </span>
        <h2 className={styles.page_h2}>
          <Trans>Our Partners</Trans>
        </h2>
        <div className={styles.section_partnerLogos}>
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
          <Image
            className={styles.page_image}
            alt={t`MOSS logo`}
            src={mossLogo}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
          />
        </div>
      </div>
      <div className={styles.page_imageSection}>
        <Image className={styles.page_backingImage} src={beach} />
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
      <div className={cx(styles.page_section, styles.page_bgGray)}>
        <span className={styles.page_eyebrow}>
          <Trans>Let's Work Together</Trans>
        </span>
        <div className={styles.page_roundedBox}>
          <h2 className={styles.page_h2}>Discord</h2>
          <p>
            <Trans>
              KlimaDAO harnesses the power of cryptocurrency, blockchain and
              smart contracts to create
            </Trans>
          </p>
          <button className={styles.page_discordButton}>
            <DiscordIcon className={styles.page_discordIcon} />
            <span>|</span>
            <span>Discord</span>
          </button>
          <Image className={styles.page_screenShot} src={screenShot} />
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
            KlimaDAO harnesses the power of cryptocurrency, blockchain and smart
            contracts to create
          </Trans>
        </p>
        <ButtonPrimary
          className={styles.page_ctaButton}
          href={"/resources/contact"}
          label={"Contact Us"}
        />
      </div>
    </Container>
  );
};
