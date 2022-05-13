import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";

import { createLinkWithLocaleQuery } from "lib/i18n";
import * as styles from "./styles";

import droneView from "public/drone_view.png";

export const RetirementFooter: FC = () => {
  const { locale } = useRouter();

  return (
    <Section variant="gray" className={styles.section}>
      <div className={styles.retirementFooter}>
        <Text t="caption" align="center" color="lightest" uppercase>
          <Trans id="retirement.footer.aboutKlima.title">About Klima</Trans>
        </Text>
        <div className={styles.footerContent}>
          <div className="column">
            <Text>
              <Trans id="retirement.footer.aboutKlima.column1">
                We’re incentivizing sustainability, and bringing the carbon
                market to Web3. We’ve made it possible for anyone to swap and
                offset with quality carbon assets. All you need is a wallet!
              </Trans>
            </Text>
          </div>
          <div className="column">
            <Text>
              <Trans id="retirement.footer.aboutKlima.column2">
                KlimaDAO is the center of a burgeoning on-chain carbon economy.
                Learn more about carbon offsetting, carbon markets, and the
                underlying assets in our{" "}
                <a href={urls.officialDocs}>knowledge base</a>.
              </Trans>
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.footerBuyKlima}>
        <Image
          alt="Drone View"
          src={droneView}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.buyKlimaImageGradient}></div>
        <Text t="h2" as="h2" className={styles.footerBuyKlimaText}>
          <Trans id="retirement.footer.buy_klima.title">
            Acquire, stake, and get rewarded.
          </Trans>
        </Text>
        <Text className={styles.footerBuyKlimaText}>
          <Trans id="retirement.footer.buy_klima.text">
            Use carbon-backed KLIMA tokens to govern, swap, and earn staking
            rewards— then use those rewards to offset your emissions!
          </Trans>
        </Text>
        <div className={styles.footerButtons}>
          <ButtonPrimary
            label={t({
              id: "retirement.footer.buy_klima.button.buy",
              message: "Buy",
            })}
            href={urls.buy}
          />
          <ButtonPrimary
            label={t({
              id: "retirement.footer.buy_klima.button.offset",
              message: "Offset",
            })}
            href={createLinkWithLocaleQuery(urls.offset, locale)}
            variant="gray"
          />
        </div>
      </div>
    </Section>
  );
};
