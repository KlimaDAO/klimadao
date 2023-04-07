import { trimWithLocale } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { Project } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  currentSupply: Project["currentSupply"];
  totalRetired: Project["totalRetired"];
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
          <Text t="body1" className={styles.itemWithColor}>
            <span className="first">
              <Trans>Total Retirements:</Trans>
            </span>
          </Text>
          <Text t="body1" color="lighter" className={styles.bold}>
            {trimWithLocale(retired || 0, 2, locale)}
          </Text>
        </div>
        <div className={styles.listItem}>
          <Text t="body1" className={styles.itemWithColor}>
            <span>
              <Trans>Remaining Supply:</Trans>{" "}
            </span>
          </Text>
          <Text t="body1" color="lighter" className={styles.bold}>
            {trimWithLocale(remaining || 0, 2, locale)}
          </Text>
        </div>
      </div>
    </>
  );
};
