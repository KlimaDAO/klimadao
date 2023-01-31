import { t, Trans } from "@lingui/macro";
import { FC } from "react";
import { useSelector } from "react-redux";

import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";

import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { selectCarbonRetired } from "state/selectors";

import { urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";

import * as styles from "./styles";

export const CarbonTonnesRetiredCard: FC = () => {
  const { address } = useWeb3();
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
        {Number(totalCarbonRetired?.totalRetirements) > 0 && (
          <ButtonPrimary
            target="_blank"
            variant="transparent"
            icon={<LaunchOutlinedIcon />}
            href={`${urls.retirements}/${address}`}
            className={styles.button}
            label={t({
              id: "offset.view_retirements",
              message: "View Retirements",
            })}
          />
        )}
      </div>
    </div>
  );
};
