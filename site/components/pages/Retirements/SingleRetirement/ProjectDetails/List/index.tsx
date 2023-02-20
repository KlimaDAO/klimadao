import { Text } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";
import { useRouter } from "next/router";
import { FC } from "react";

import { Anchor as A } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";

import * as styles from "./styles";

type Props = {
  tokenAddress: string;
  projectLink: string;
  headline: string;
  totalRetired?: string;
  currentSupply?: string;
  isMossOffset?: boolean;
  methodology?: string;
  location?: string;
};

export const ProjectDetail: FC<Props> = (props) => {
  const { locale } = useRouter();
  const trimTotalRetired =
    props.totalRetired && Number(props.totalRetired)
      ? trimWithLocale(props.totalRetired, 0, locale)
      : null;
  const trimCurrentSupply =
    props.currentSupply && Number(props.currentSupply)
      ? trimWithLocale(props.currentSupply, 0, locale)
      : null;

  return (
    <div className={styles.listItem}>
      <Text t="h4">
        <A className="link" href={props.projectLink}>
          {props.headline}{" "}
          <span className="svg">
            <LaunchIcon fontSize="inherit" />
          </span>
        </A>
      </Text>
      {props.location && (
        <Text t="caption">
          <Trans>Location: {props.location}</Trans>
        </Text>
      )}
      {props.methodology && (
        <Text t="caption">
          <Trans>Methodology: {props.methodology}</Trans>
        </Text>
      )}
      {trimTotalRetired && (
        <Text t="caption">
          <Trans>{trimTotalRetired} Tonnes retired in total</Trans>
        </Text>
      )}
      {trimCurrentSupply && (
        <Text t="caption">
          <Trans>{trimCurrentSupply} Tonnes remaining</Trans>
        </Text>
      )}
      {props.isMossOffset && (
        <div className="button_link">
          <A href={`${urls.carbonDashboard}/MCO2`}>
            <Trans>Explore MCO2 on carbon.klimadao.finance</Trans>
          </A>
        </div>
      )}
      <div className="button_link">
        <A href={`https://polygonscan.com/address/${props.tokenAddress}`}>
          <Trans>View on Polygonscan</Trans>
        </A>
      </div>
    </div>
  );
};
