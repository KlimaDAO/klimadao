import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Project } from "lib/types/carbonmark.types";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  totalSupply: Project["stats"]["totalSupply"];
  totalRetired: Project["stats"]["totalRetired"];
}

export const StatsBar: FC<Props> = (props) => {
  const { locale } = useRouter();

  const retired = Number(props.totalRetired ?? 0);
  const remaining = Number(props.totalSupply ?? 0);
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
              <InfoOutlinedIcon className={styles.tooltipIcon} />
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
              <InfoOutlinedIcon className={styles.tooltipIcon} />
            </TextInfoTooltip>
          </div>

          <Text t="body1" color="lighter" className={styles.bold}>
            {trimWithLocale(remaining || 0, 2, locale)}
          </Text>
        </div>
      </div>
    </>
  );
};
