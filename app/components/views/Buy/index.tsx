import { Anchor, ButtonPrimary, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import { CelebrationOutlined } from "@mui/icons-material";
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
      <div className={styles.cardCol}>
        <Text t="h5" className={styles.cardTitle}>
          <Payment />
          <Trans>Buy KLIMA</Trans>
        </Text>
        <Text color="lightest" t="caption" className={styles.cardDescription}>
          <Trans>
            The best way to earn money on your Klima is to buy on{" "}
            <Anchor href={urls.aerodrome}>Aerodrome</Anchor> and deposit into a
            liquidity pool.
          </Trans>
        </Text>
      </div>
      <div className={styles.cardRow}>
        <div className={styles.buttons}>
          <ButtonPrimary
            href={urls.buyOnAerodrome}
            label="Buy KLIMA on Aerodrome"
          />
          <ButtonPrimary
            href={urls.learnMoreLPs}
            className="learn-more"
            label="Learn more about liquidity pools"
          />
        </div>
      </div>
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
          <Anchor href={urls.learnMoreKlima2_0}>
            <Trans>Read more about KlimaDAO 2.0</Trans>
          </Anchor>
        </div>
      </div>
    </div>
  </>
);
