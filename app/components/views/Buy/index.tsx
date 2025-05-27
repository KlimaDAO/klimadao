import { cx } from "@emotion/css";
import { Anchor, ButtonPrimary, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import { CelebrationOutlined, TrendingUpOutlined } from "@mui/icons-material";
import Payment from "@mui/icons-material/Payment";
import { BalancesCard } from "components/BalancesCard";
import { DisclaimerModal } from "components/DisclaimerModal";
import { ImageCard } from "components/ImageCard";
import * as styles from "./styles";

export const Buy = () => (
  <>
    <DisclaimerModal />
    <BalancesCard assets={["klima", "sklima"]} tooltip={undefined} />
    <ImageCard />

    <div className={styles.card}>
      <div className={styles.cardRow}>
        <div className={styles.cardMessage}>
          <div className="title">
            <CelebrationOutlined
              fontSize="large"
              htmlColor="var(--klima-green)"
            />
            <Text t="body3">
              <Trans>
                Announcing KlimaDAO 2.0: A Decentralized Carbon Market!
              </Trans>
            </Text>
          </div>
          <Text t="caption" color="lightest" className="description">
            <Trans>
              KlimaDAO 2.0 represents a fundamental redesign of decentralized
              market infrastructure for carbon monetization, retirement, and
              offsets. While KlimaDAO has established a brand presence and
              accumulated substantial carbon assets, the 2.0 model introduces
              sophisticated mechanisms to become the dominant liquidity venue
              for carbon on-chain by releasing the Klima X Automated Market
              Maker (AMM).
            </Trans>
          </Text>
          <Anchor href={urls.learnMoreKlima2_0} target="_blank">
            <Trans>Read more about KlimaDAO 2.0</Trans>
          </Anchor>
        </div>
      </div>
      <div className={styles.cardCol}>
        <Text t="h5" className={styles.cardTitle}>
          <Payment />
          <Trans>Buy KLIMA</Trans>
        </Text>
        <Text color="lightest" t="caption" className={styles.cardDescription}>
          <Trans>
            Easily buy or sell KLIMA with low slippage and deep liquidity on{" "}
            <Anchor href={urls.aerodrome} target="_blank">
              Aerodrome
            </Anchor>
            .
          </Trans>
        </Text>
      </div>
      <div className={styles.cardRow}>
        <div className={styles.buttons}>
          <ButtonPrimary
            target="_blank"
            className={styles.responsiveButtonWidth}
            href={urls.buyOnAerodrome}
            label={t`Buy Klima on Aerodrome`}
          />
          <Anchor
            target="_blank"
            href={urls.learnMoreLPs}
            className="learn-more"
          >
            <Trans>Learn more about liquidity pools</Trans>
          </Anchor>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.cardRow}>
        <div className={styles.cardCol}>
          <Text t="h5" className={styles.cardTitle}>
            <TrendingUpOutlined />
            <Trans>Put your KLIMA to work</Trans>
          </Text>
          <Text color="lightest" t="caption" className={styles.cardDescription}>
            <Trans>
              Head to{" "}
              <Anchor href={urls.klimaBase} target="_blank">
                base.klimadao.finance
              </Anchor>{" "}
              to programmatically grow your position.
            </Trans>
          </Text>
        </div>
      </div>
      <div className={styles.cardRow}>
        <div className={styles.buttons}>
          <ButtonPrimary
            target="_blank"
            href={urls.klimaAutocompounder}
            label={t`KlimaDAO Autocompounder`}
            className={cx("secondary-button", styles.responsiveButtonWidth)}
          />
          <Anchor
            target="_blank"
            href={urls.learnMoreKlimaAutocompounder}
            className="learn-more"
          >
            <Trans>Learn more about Autocompounder</Trans>
          </Anchor>
        </div>
      </div>
    </div>
  </>
);
