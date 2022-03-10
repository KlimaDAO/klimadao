import { Text } from "@klimadao/lib/components";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import * as styles from "./styles";
import { FC } from "react";
import { Trans } from "@lingui/macro";

interface Props {
  isConnected?: boolean;
}

export const CarbonTonsRetiredCard: FC<Props> = () => {
  return (
    <div className={styles.card}>
      <div className="header">
        <Text t="h4" className="title">
          <ForestOutlinedIcon />
          <Trans id="offset.you_have_retired">You've Retired</Trans>
        </Text>
      </div>
      <div className="cardContent">
        <div className="stack">
          <Text className="value">
            {Number(0.0).toFixed(3) ?? (
              <Trans id="shared.loading">Loading...</Trans>
            )}
          </Text>
          <Text className="label" color="lightest">
            <Trans id="offset.tonnes_of_carbon_retired">
              Tonnes of carbon retired
            </Trans>
          </Text>
        </div>
      </div>
    </div>
  );
};
