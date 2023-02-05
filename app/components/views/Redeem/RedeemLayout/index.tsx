import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import RedeemIcon from "@mui/icons-material/Redeem";

import { CarbonTonnesBreakdownCard } from "components/CarbonTonnesBreakdownCard";
import { CarbonTonnesRetiredCard } from "components/CarbonTonnesRetiredCard";

import * as styles from "./styles";

type Props = {
  children: React.ReactNode;
};

export const RedeemLayout: React.FC<Props> = (props) => (
  <>
    <div className={styles.columnRight}>
      <CarbonTonnesRetiredCard />
      <CarbonTonnesBreakdownCard />
    </div>

    <div className={styles.redeemCard}>
      <div className={styles.redeemCard_header}>
        <Text t="h4" className={styles.redeemCard_header_title}>
          <RedeemIcon />
          <Trans id="redeem.redeem_carbon">Redeem Carbon</Trans>
        </Text>
        <Text t="caption" color="lightest">
          <Trans id="redeem.description">
            Already own tokenized carbon from a pool and want to exchange it for
            a more specific carbon credit? Redeem it here in exchange for
            specific TCO2 tokens.
          </Trans>
        </Text>
        <Text t="caption" color="lightest">
          <Trans id="redeem.fiat_description">
            Interested in acquiring carbon tokens from a specific carbon project
            with USDC or Credit Card? You can also do that here.
          </Trans>
        </Text>
      </div>

      {props.children}
    </div>
  </>
);
