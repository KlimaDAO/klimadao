import { Anchor } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { Text } from "components/Text";
import { getPolygonScanBaseUrl } from "lib/createUrls";
import type { AssetForRetirement } from "lib/types/carbonmark.types";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  balance: string;
  retirementAsset: AssetForRetirement;
  icon: StaticImageData;
}

export const RetirementSidebar: FC<Props> = (props) => {
  const { tokenSymbol, credit } = props.retirementAsset;
  const { networkLabel } = useWeb3();
  return (
    <div className={styles.assetWrapper}>
      <Text t="h4" className={styles.bold}>
        <Trans>Asset Details</Trans>
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
      <div className={styles.group}>
        <Text t="body2" color="lighter">
          <Trans>Available to retire</Trans>
        </Text>
        <Text t="body1" className={styles.bold}>
          {Number(props.balance)} {t`tonnes`}
        </Text>
      </div>
      <div className={styles.linkWithIcon}>
        <Anchor
          className="link"
          href={`${getPolygonScanBaseUrl(networkLabel)}/address/${
            credit.tokenAddress
          }`}
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
    </div>
  );
};
