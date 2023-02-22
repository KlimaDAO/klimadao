import { Trans } from "@lingui/macro";
import CloudOutlined from "@mui/icons-material/CloudOutlined";
import { Image } from "components/Image";
import { FC } from "react";

import { Text } from "@klimadao/lib/components";

import BCT from "public/icons/BCT.png";
import C3T from "public/icons/C3T.png";
import MCO2 from "public/icons/MCO2.png";
import NBO from "public/icons/NBO.png";
import NCT from "public/icons/NCT.png";
import TCO2 from "public/icons/TCO2.png";
import UBO from "public/icons/UBO.png";

import { RetirementToken, retirementTokens } from "@klimadao/lib/constants";
import { ProjectTokenBalance } from "@klimadao/lib/types/offset";
import { StaticImageData } from "next/image";
import { useSelector } from "react-redux";
import { selectCarbonRetired, selectProjectTokens } from "state/selectors";
import * as styles from "./styles";

type Token = RetirementToken | "tco2" | "c3t";
type IconMap = { [key in Token]: StaticImageData };

const iconMap: IconMap = {
  ubo: UBO,
  nbo: NBO,
  mco2: MCO2,
  nct: NCT,
  bct: BCT,
  tco2: TCO2,
  c3t: C3T,
};

export const CarbonTonnesBreakdownCard: FC = () => {
  const carbonRetired = useSelector(selectCarbonRetired);
  const projectTokens = useSelector(selectProjectTokens);
  const retiredProjectTokens = Object.keys(projectTokens).reduce<
    ProjectTokenBalance[]
  >((arr, tkn) => {
    const asset = projectTokens[tkn];
    if (Number(asset.retired) > 0) return [...arr, asset];
    return arr;
  }, []);

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
          <Trans>Retirements</Trans>
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
          {retiredTokens.map((tkn, index) => (
            <div className={styles.row} key={`${tkn}-${index}`}>
              <div className="image">
                <Image src={iconMap[tkn]} width={48} height={48} alt="" />
              </div>
              <div className="label">
                <Text>{carbonRetired?.[tkn] || 0}</Text>
                <Text color="lightest">{tkn.toUpperCase()}</Text>
              </div>
            </div>
          ))}
          {retiredProjectTokens.map((tkn, index) => (
            <div className={styles.row} key={`${tkn.symbol}-${index}`}>
              <div className="image">
                <Image
                  src={iconMap[tkn.symbol.startsWith("TCO2") ? "tco2" : "c3t"]}
                  width={48}
                  height={48}
                  alt=""
                />
              </div>
              <div className="label">
                <Text>{tkn.retired}</Text>
                <Text color="lightest">{tkn.symbol}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
