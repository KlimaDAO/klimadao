import { FC } from "react";

import { Trans } from "@lingui/macro";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";

import { useSelector } from "react-redux";
import { selectCarbonRetired } from "state/selectors";

import { Text } from "@klimadao/lib/components";

import * as styles from "./styles";

export const CarbonTonnesRetiredCard: FC = () => {
  const totalCarbonRetired = useSelector(selectCarbonRetired);
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
            {totalCarbonRetired?.totalTonnesRetired ?? "0"}
          </Text>
          <Text className="label" color="lightest">
            <Trans id="offset.tonnes_of_carbon_retired">Tonnes of carbon</Trans>
          </Text>
        </div>
        <div className="stack">
          <Text className="value">
            {totalCarbonRetired?.totalRetirements ?? "0"}
          </Text>
          <Text className="label" color="lightest">
            <Trans id="offset.number_of_retirements">Total retirements</Trans>
          </Text>
        </div>
      </div>
    </div>
  );
};
