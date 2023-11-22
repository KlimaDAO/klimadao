import { Anchor as A, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import { CarbonBalancesCard } from "components/CarbonBalancesCard";
import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";
import * as styles from "../styles";
import * as localStyles from "./styles";

interface Props {
  isConnected: boolean;
}

export const Offset = (props: Props) => {
  return (
    <>
      <div className={styles.columnRight}>
        <CarbonTonnesRetiredCard isConnected={props.isConnected} />
        <CarbonBalancesCard isConnected={props.isConnected} />
      </div>

      <div className={`${styles.ctaCard} ${localStyles.offsetCard}`}>
        <div className={styles.ctaCard_header}>
          <div>
            <Text t="h4" className={styles.ctaCard_header_title}>
              <ParkOutlined />
              <Trans>Offset</Trans>
            </Text>
            <Text t="caption" className={styles.ctaCard_header_subtitle}>
              <Trans id="offset.cta_1">
                KlimaDAO's retirement aggregator is an open-source tool that
                enables the retirement of digital carbon credits.
              </Trans>
            </Text>
            <Text t="caption" className={styles.ctaCard_header_subtitle}>
              <Trans id="offset.cta_2">
                Visit our{" "}
                <a href={urls.carbonmarkDocRetirements}> documentation </a> to
                build it into your application, or visit{" "}
                <A href={urls.carbonmarkRetirePage}> Carbonmark </A> to use a
                live implementation.
              </Trans>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
