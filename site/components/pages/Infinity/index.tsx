import React from "react";
import { NextPage } from "next";
import Image from "next/image";
// import Link from "next/link";
import { Trans, t } from "@lingui/macro";
import {
  Section,
  ButtonPrimary,
  ButtonSecondary,
  Text,
} from "@klimadao/lib/components";

import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { LatestPost } from "lib/queries";

import klimaInfinityLogo from "public/logo-klima-infinity.png";
import klimaInfinityBackground from "public/bg-infinity.png";

import * as styles from "./styles";

export interface Props {
  latestPost: LatestPost;
  treasuryBalance: number;
  weeklyStakingRewards: number;
}

export const Infinity: NextPage<Props> = () => {
  return (
    <>
      <PageHead
        title="KlimaDAO"
        mediaTitle="KlimaDAO"
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />

      <Navigation activePage="Infinity" />

      <Section variant="gray" className={styles.heroSection}>
        <div className="hero_container">
          <div className="hero_image_container">
            <Image
              src={klimaInfinityBackground}
              alt="Infinity background "
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="hero_title_container">
            <Image src={klimaInfinityLogo} alt="Klima Infinity logo" />
            <Trans
              id="home.welcome_to_infinity"
              comment="<0>WELCOME TO</0><1>KlimaDAO</1>"
            >
              <Text t="h2" className="hero_title">
                The easiest way to go carbon neutral
              </Text>
              <Text t="body2">
                Klima Infinity is a next-generation carbon toolkit for your
                organization
              </Text>
            </Trans>
            <div className="hero_buttons">
              <ButtonPrimary
                className="hero_button_primary"
                variant="blue"
                label="Get started"
              />
              <ButtonSecondary variant="blue" label="Contact sales" />
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
