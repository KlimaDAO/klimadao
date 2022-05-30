import { FC } from "react";
import { useRouter } from "next/router";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";

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
    !!totalRetired &&
    Number(trimStringDecimals(totalRetired, 6)).toLocaleString(locale);

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
        <ButtonPrimary
          className="gray_button"
          variant="gray"
          href={`https://polygonscan.com/address/${tokenAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          label={t({
            id: "retirement.single.project_details.view_on_polygon_scan",
            message: "View on Polygonscan",
          })}
        />
      </div>
    </div>
  );
};
