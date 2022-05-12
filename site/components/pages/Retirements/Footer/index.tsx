import { FC } from "react";
import Image from "next/image";
import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";

import droneView from "public/drone_view.png";

export const RetirementFooter: FC = () => {
  return (
    <Section variant="gray" className={styles.section}>
      <div className={styles.retirementFooter}>
        <Text t="caption" align="center" color="lightest" uppercase>
          <Trans id="retirement.footer.aboutKlima.title">About Klima</Trans>
        </Text>
        <div className={styles.footerContent}>
          <div className="column">
            <Text>
              <Trans id="retirement.footer.aboutKlima.stake">
                Stake your KLIMA to earn rewards, and use those rewards to
                offset!
              </Trans>
            </Text>
          </div>
          <div className="column">
            <Text>
              <Trans id="retirement.footer.aboutKlima.learnMore">
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
          <Trans id="retirement.footer.buyKlima.title">
            KLIMA is the easiest way to reach your sustainability goals.
          </Trans>
        </Text>
        <Text className={styles.footerBuyKlimaText}>
          <Trans id="retirement.footer.buyKlima.text">
            KLIMA tokens can be used to swap and retire a variety of
            high-quality, transparent, third-party verified carbon offsets.
            Stake your KLIMA to earn rewards, and use those rewards to offset!
          </Trans>
        </Text>
        <div className={styles.footerButtons}>
          <ButtonPrimary
            label={t({ id: "retirement.button.buy", message: "Buy KLIMA" })}
            href={urls.buy}
          />
          <ButtonPrimary
            label={t({
              id: "retirement.button.learnMore",
              message: "Learn More",
            })}
            href={urls.resources}
            variant="gray"
          />
        </div>
      </div>
    </Section>
  );
};
