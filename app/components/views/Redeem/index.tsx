import { Anchor as A, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import RedeemOutlined from "@mui/icons-material/RedeemOutlined";
import { CarbonBalancesCard } from "components/CarbonBalancesCard";
import * as styles from "../styles";

interface Props {
  isConnected: boolean;
}

export const Redeem = (props: Props) => {
  return (
    <>
      <div className={styles.columnRight}>
        <CarbonBalancesCard isConnected={props.isConnected} />
      </div>

      <div className={styles.ctaCard}>
        <div className={styles.ctaCard_header}>
          <Text t="h4" className={styles.ctaCard_header_title}>
            <RedeemOutlined />
            <Trans>Buy & Redeem Carbon</Trans>
          </Text>
          <Text t="caption" color="lightest">
            <Trans id="redeem.cta">
              <A href={urls.carbonmark}> Carbonmark </A>is now the main hub to
              acquire and retire carbon from verified projects. Features from
              the aggregator are progressively being moved. To acquire carbon,
              please visit the{" "}
              <A href={urls.carbonmarkProjectsPage}>projects page</A>.
            </Trans>
          </Text>
        </div>
      </div>
    </>
  );
};
