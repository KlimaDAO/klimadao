import { FC } from "react";
import { Image } from "components/Image";
import { StaticImageData } from "next/image";
import { Trans } from "@lingui/macro";
import CloudOutlined from "@mui/icons-material/CloudOutlined";

import { Text } from "@klimadao/lib/components";

import BCT from "public/icons/BCT.png";
import MCO2 from "public/icons/MCO2.png";
import NCT from "public/icons/NCT.png";
import UBO from "public/icons/UBO.png";
import NBO from "public/icons/NBO.png";

import * as styles from "./styles";
import { useSelector } from "react-redux";
import { selectCarbonRetired } from "state/selectors";
import { RetirementToken, retirementTokens } from "@klimadao/lib/constants";

type IconMap = { [key in RetirementToken]: StaticImageData };

const iconMap: IconMap = {
  ubo: UBO,
  nbo: NBO,
  mco2: MCO2,
  nct: NCT,
  bct: BCT,
};

export const CarbonTonnesBreakdownCard: FC = () => {
  const carbonRetired = useSelector(selectCarbonRetired);
  const retiredTokens = retirementTokens.filter(
    (tkn) => carbonRetired && Number(carbonRetired[tkn]) > 0
  );
  const isLoading = !carbonRetired;
  const isEmpty = !isLoading && !retiredTokens.length;
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
          {isLoading && (
            <Text color="lightest">
              <Trans id="shared.loading" />
            </Text>
          )}
          {isEmpty && (
            <Text color="lightest">
              <Trans id="offset.empty">
                This address has not completed any retirements.
              </Trans>
            </Text>
          )}
          {retiredTokens.map((tkn) => (
            <>
              <div className={styles.row}>
                <div className="image">
                  <Image src={iconMap[tkn]} width={48} height={48} alt="" />
                </div>
                <div className="content">
                  <Text className="value">{carbonRetired?.[tkn] || 0}</Text>
                  <Text className="label" color="lightest">
                    {tkn.toUpperCase()}
                  </Text>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
