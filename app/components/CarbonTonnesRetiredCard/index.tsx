import { FC } from "react";

import { Trans } from "@lingui/macro";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";

import { Text } from "@klimadao/lib/components";
import { TotalCarbonRetired } from "components/views/Offset/types";

import * as styles from "./styles";

interface Props {
  totalCarbonRetired?: TotalCarbonRetired;
}

export const CarbonTonnesRetiredCard: FC<Props> = (props) => {
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
            {props.totalCarbonRetired?.totalTonnesRetired ?? (
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
