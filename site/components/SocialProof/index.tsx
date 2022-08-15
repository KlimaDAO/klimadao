import React, { FC } from "react";
import { Trans } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";

import BloombergLogo from "./Logos/BloombergLogo";
import CointelegraphLogo from "./Logos/CointelegraphLogo";
import ForbesLogo from "./Logos/ForbesLogo";
import NasdaqLogo from "./Logos/NasdaqLogo";
import TheTimesLogo from "./Logos/TheTimesLogo";
import WiredLogo from "./Logos/WiredLogo";
import WallStreetJournalLogo from "./Logos/WallStreetJournalLogo";
import YahooFinanceLogo from "./Logos/YahooFinanceLogo";

import * as styles from "./styles";

export const SocialProof: FC = () => (
  <div className={styles.socialProof_container}>
    <Text t="h5" as="h2">
      <Trans id="home.featured_on">KlimaDAO featured on</Trans>
    </Text>

    <div className="socialProof_logos">
      <div className="socialProof_logos_item">
        <BloombergLogo />
      </div>

      <div className="socialProof_logos_item">
        <CointelegraphLogo />
      </div>

      <div className="socialProof_logos_item">
        <ForbesLogo />
      </div>

      <div className="socialProof_logos_item">
        <NasdaqLogo />
      </div>

      <div className="socialProof_logos_item">
        <TheTimesLogo />
      </div>

      <div className="socialProof_logos_item">
        <WiredLogo />
      </div>

      <div className="socialProof_logos_item">
        <WallStreetJournalLogo />
      </div>

      <div className="socialProof_logos_item">
        <YahooFinanceLogo />
      </div>
    </div>
  </div>
);
