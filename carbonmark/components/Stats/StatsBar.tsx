import { urls } from "@klimadao/lib/constants";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { InfoOutlined, LaunchOutlined } from "@mui/icons-material";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Project } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  currentSupply: Project["currentSupply"];
  totalRetired: Project["totalRetired"];
  projectAddress: string;
}

export const StatsBar: FC<Props> = (props) => {
  const { locale } = useRouter();

  const retired = Number(props.totalRetired ?? 0);
  const remaining = Number(props.currentSupply ?? 0);
  const full = retired + remaining;
  const retirementPercent = Math.round((retired / full) * 100);

  return (
    <>
      <div
        className={styles.bar}
        style={{ "--percent": retirementPercent } as React.CSSProperties}
      />
      <div className={styles.list}>
        <div className={styles.listItem}>
          <div className={styles.textWithTooltipWrapper}>
            <Text t="body1" className={styles.itemWithColor}>
              <span className="first">
                <Trans>Total Retirements:</Trans>
              </span>
            </Text>
            <TextInfoTooltip
              className={styles.tooltip}
              align="start"
              tooltip={t`Amount of credits from this project/vintage combination that have been retired.`}
            >
              <InfoOutlined className={styles.tooltipIcon} />
            </TextInfoTooltip>
          </div>

          <Text t="body1" color="lighter" className={styles.bold}>
            {trimWithLocale(retired || 0, 2, locale)}
          </Text>
        </div>
        <div className={styles.listItem}>
          <div className={styles.textWithTooltipWrapper}>
            <Text t="body1" className={styles.itemWithColor}>
              <span>
                <Trans>Remaining Supply:</Trans>
              </span>
            </Text>
            <TextInfoTooltip
              className={styles.tooltip}
              align="start"
              tooltip={t`Amount of credits that have been bridged from this project/vintage combination but not yet retired.`}
            >
              <InfoOutlined className={styles.tooltipIcon} />
            </TextInfoTooltip>
          </div>

          <Text t="body1" color="lighter" className={styles.bold}>
            {trimWithLocale(remaining || 0, 2, locale)}
          </Text>
        </div>
        <Link href={urls.polygonscan + "/address/" + props.projectAddress}>
          <Text t="body2" color="lighter" className={styles.polygonScanLink}>
            <Trans>View project on PolygonScan</Trans>
            <LaunchOutlined className={styles.launchIcon} />
          </Text>
        </Link>
      </div>
    </>
  );
};
