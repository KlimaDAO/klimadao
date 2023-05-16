import { Anchor } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Card } from "components/Card";
import { Text } from "components/Text";
import type { AssetForRetirement } from "lib/types/carbonmark";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  retirementAsset: AssetForRetirement;
  icon: StaticImageData;
}

export const RetirementSidebar: FC<Props> = (props) => {
  const { tokenSymbol, project } = props.retirementAsset;
  return (
    <Card>
      <Text t="h4" className={styles.bold}>
        <Trans id="portfolio.asset_details.title">Asset Details</Trans>
      </Text>
      <div className={styles.group}>
        <Text t="body2" color="lighter">
          <Trans>Asset ID</Trans>
        </Text>
        <Text t="body1" className={styles.bold}>
          <Image src={props.icon} className={styles.icon} alt="icon" />
          <Trans>{tokenSymbol}</Trans>
        </Text>
      </div>

      <div className={styles.linkWithIcon}>
        <Anchor
          className="link"
          href={`https://polygonscan.com/address/${project.tokenAddress}`}
        >
          <span className="svg">
            <Text t="body2" color="lighter">
              <Trans>
                View on PolygonScan <LaunchIcon fontSize="inherit" />
              </Trans>
            </Text>
          </span>
        </Anchor>
      </div>

      <div className={styles.group}>
        <Text t="body2" color="lighter">
          <Trans>Balance (available to retire)</Trans>
        </Text>
        <Text t="body1" className={styles.bold}>
          {Math.round(Number(project.currentSupply))} tonnes
        </Text>
      </div>
    </Card>
  );
};
