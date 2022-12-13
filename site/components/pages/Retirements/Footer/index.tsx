import { FC } from "react";

import { Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";

import * as styles from "./styles";

export const RetirementFooter: FC = () => {
  return (
    <div className={styles.retirementFooter}>
      <Text t="caption" align="center" color="lightest" uppercase>
        <Trans id="retirement.footer.aboutKlima.title">About Klima</Trans>
      </Text>
      <div className={styles.footerContent}>
        <div className="column">
          <Text>
            <Trans id="retirement.footer.aboutKlima.left">
              KlimaDAO is incentivizing sustainability and catalyzing a more
              transparent and liquid carbon market. Our tools make it possible
              for any individual or businesses to trade and retire quality
              carbon assets on the blockchain.
            </Trans>
          </Text>
        </div>
        <div className="column">
          <Text>
            <Trans id="retirement.footer.aboutKlima.right">
              KLIMA tokens are at the center of a burgeoning on-chain carbon
              economy. Visit our <a href={urls.officialDocs}>knowledge base</a>{" "}
              to learn more about KLIMA, carbon offsetting, carbon markets, and
              the underlying carbon assets.
            </Trans>
          </Text>
        </div>
      </div>
    </div>
  );
};
