import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import type { AssetForRetirement } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  retirementAsset: AssetForRetirement;
}

export const RetirementSidebar: FC<Props> = (props) => {
  const { tokenName, tokenSymbol } = props.retirementAsset;
  return (
    <Card>
      <Text t="h4">
        <Trans id="portfolio.balances.title">Asset Details</Trans>
      </Text>
      <div className={styles.list}>
        <div className={styles.listItem} key={tokenName}>
          <div className={styles.itemWithIcon}>
            <Text t="body1">{tokenSymbol}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
