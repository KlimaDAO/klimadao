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
          <Text t="h4" className={styles.ctaCard_header_title}>
            <ParkOutlined />
            <Trans>Offset</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="offset.cta">
              <A href={urls.carbonmark}> Carbonmark </A>is now the main hub to
              acquire and retire carbon from verified projects. Features from
              the aggregator are progressively being moved. To retire carbon,
              please visit the{" "}
              <A href={urls.carbonmarkRetirePage}>retirements page</A>.
            </Trans>
          </Text>
        </div>
      </div>
    </>
  );
};
