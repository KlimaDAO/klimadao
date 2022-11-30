import { FC } from "react";
import { useRouter } from "next/router";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";

import LaunchIcon from "@mui/icons-material/Launch";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  tokenAddress: string;
  projectLink: string;
  headline: string;
  totalRetired?: string;
};

export const ProjectDetail: FC<Props> = (props) => {
  const { projectLink, headline, tokenAddress, totalRetired } = props;
  const { locale } = useRouter();

  const trimTotalRetired =
    !!totalRetired && trimWithLocale(totalRetired, 2, locale);

  return (
    <div className={styles.listItem}>
      <Text t="h4">
        <a
          className="link"
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {headline}{" "}
          <span className="svg">
            <LaunchIcon fontSize="inherit" />
          </span>
        </a>
      </Text>
      {trimTotalRetired && (
        <Text>
          {trimTotalRetired}{" "}
          <Trans id="retirement.single.project_details.tonnes">Tonnes</Trans>
        </Text>
      )}
      <div className="button_link">
        <a href={`https://polygonscan.com/address/${tokenAddress}`}>
          <Trans id="retirement.single.project_details.view_on_polygon_scan">
            View on Polygonscan
          </Trans>
        </a>
      </div>
    </div>
  );
};
