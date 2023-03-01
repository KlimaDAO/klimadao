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
            Swap USDC or other tokens for a specific offset project. The project
            tokens will be swapped out of the pool and transferred to your
            wallet, so you can trade or retire them later.
          </Trans>
        </Text>
      </div>

      {props.children}
    </div>
  </>
);
