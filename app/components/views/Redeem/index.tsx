import { Anchor as A, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import RedeemOutlined from "@mui/icons-material/RedeemOutlined";
import { CarbonBalancesCard } from "components/CarbonBalancesCard";
import * as styles from "../styles";
import * as localStyles from "./styles";

interface Props {
  isConnected: boolean;
}

export const Redeem = (props: Props) => {
  return (
    <>
      <div className={styles.columnRight}>
        <CarbonBalancesCard isConnected={props.isConnected} />
      </div>

      <div className={`${styles.ctaCard} ${localStyles.redeemCard}`}>
        <div className={styles.ctaCard_header}>
          <div>
            <Text t="h4" className={styles.ctaCard_header_title}>
              <RedeemOutlined />
              <Trans>Buy & Redeem Carbon</Trans>
            </Text>
            <Text t="caption" className={styles.ctaCard_header_subtitle}>
              <Trans id="redeem.cta_1">
                KlimaDAO's digital carbon liquidity pools are common resources
                available for driving environmental impact.
              </Trans>
            </Text>
            <Text t="caption" className={styles.ctaCard_header_subtitle}>
              <Trans id="redeem.cta_2">
                Visit our{" "}
                <a href={urls.carbonmarkDocDeploymentAddresses}>
                  {" "}
                  documentation{" "}
                </a>{" "}
                to find the LP contract addresses, or visit{" "}
                <A href={urls.carbonmarkProjectsPage}> Carbonmark </A> to
                acquire carbon via a simple user interface.
              </Trans>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
