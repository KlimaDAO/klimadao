import { FC } from "react";
import Image from "next/image";

import { Trans } from "@lingui/macro";
import CloudOutlined from "@mui/icons-material/CloudOutlined";

import { Text } from "@klimadao/lib/components";
import { TotalCarbonRetired } from "components/views/Offset/types";

import BCT from "public/icons/BCT.png";
import MCO2 from "public/icons/MCO2.png";
import NCT from "public/icons/NCT.png";

import * as styles from "./styles";

interface Props {
  totalCarbonRetired?: TotalCarbonRetired;
}

export const CarbonTonnesBreakdownCard: FC<Props> = (props) => {
  return (
    <div className={styles.card}>
      <div className="header">
        <Text t="h4" className="title">
          <CloudOutlined />
          <Trans id="offset.breakdown">Breakdown</Trans>
        </Text>
      </div>
      <div className="cardContent">
        <div className="stack">
          <Text t="body3">
            <Trans id="offset.retired">Retired</Trans>
          </Text>
          <div className={styles.row}>
            <div className="image">
              <Image src={BCT} width={64} height={64} alt="BCT" />
            </div>
            <div className="content">
              <Text className="value">
                {props.totalCarbonRetired?.totalBCTRetired ?? 0}
              </Text>
              <Text className="label" color="lightest">
                <Trans id="offset.tons_of_carbon_retired">BCT</Trans>
              </Text>
            </div>
          </div>
          <Text t="body3">
            <Trans id="offset.retired">Retired</Trans>
          </Text>
          <div className={styles.row}>
            <div className="image">
              <Image src={NCT} width={64} height={64} alt="NCT" />
            </div>
            <div className="content">
              <Text className="value">
                {props.totalCarbonRetired?.totalNCTRetired ?? 0}
              </Text>
              <Text className="label" color="lightest">
                <Trans id="offset.tons_of_carbon_retired">NCT</Trans>
              </Text>
            </div>
          </div>
          <Text t="body3">
            <Trans id="offset.retired">Retired</Trans>
          </Text>
          <div className={styles.row}>
            <div className="image">
              <Image src={MCO2} width={64} height={64} alt="MCO2" />
            </div>
            <div className="content">
              <Text className="value">
                {props.totalCarbonRetired?.totalMCO2Retired ?? 0}
              </Text>
              <Text className="label" color="lightest">
                <Trans id="offset.tons_of_carbon_retired">MCO2</Trans>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
