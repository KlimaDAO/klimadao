import { FC } from "react";
import { useRouter } from "next/router";
import { Anchor as A, Text } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";
import { urls } from "@klimadao/lib/constants";
import LaunchIcon from "@mui/icons-material/Launch";
import { Trans } from "@lingui/macro";

import * as styles from "./styles";

type Props = {
  tokenAddress: string;
  projectLink: string;
  headline: string;
  totalRetired?: string;
  isMossOffset?: boolean;
};

export const ProjectDetail: FC<Props> = (props) => {
  const { projectLink, headline, tokenAddress, totalRetired } = props;
  const { locale } = useRouter();

  const trimTotalRetired =
    !!totalRetired && trimWithLocale(totalRetired, 2, locale);

  return (
    <div className={styles.listItem}>
      <Text t="h4">
        <A className="link" href={projectLink}>
          {headline}{" "}
          <span className="svg">
            <LaunchIcon fontSize="inherit" />
          </span>
        </A>
      </Text>
      {trimTotalRetired && (
        <Text>
          {trimTotalRetired}{" "}
          <Trans id="retirement.single.project_details.tonnes">Tonnes</Trans>
        </Text>
      )}

      {props.isMossOffset && (
        <div className="button_link">
          <A href={`${urls.carbonDashboard}/MCO2`}>
            <Trans id="retirement.single.project_details.view_mco2_pool">
              View MCO2 pool activity
            </Trans>
          </A>
        </div>
      )}

      <div className="button_link">
        <A href={`https://polygonscan.com/address/${tokenAddress}`}>
          <Trans id="retirement.single.project_details.view_on_polygon_scan">
            View transaction on Polygonscan
          </Trans>
        </A>
      </div>
    </div>
  );
};
