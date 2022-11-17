import React, { FC } from "react";
import { Trans, t } from "@lingui/macro";
import dynamic from "next/dynamic";
import Link from "next/link";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LaunchIcon from "@mui/icons-material/Launch";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { BaseCard } from "../BaseCard";
import { RetirementsChartProps } from "./RetirementsChart";
import * as styles from "./styles";

const RetirementsChart: React.ComponentType<RetirementsChartProps> = dynamic(
  () => import("./RetirementsChart").then((mod) => mod.RetirementsChart),
  { ssr: false }
);

type Props = {
  pageAddress: string;
  retirements: RetirementsTotalsAndBalances | null;
};

export const RetirementsCard: FC<Props> = (props) => {
  const totalTonnesRetired =
    props.retirements && Number(props.retirements.totalTonnesRetired) > 0
      ? trimStringDecimals(props.retirements.totalTonnesRetired, 2)
      : 0;

  const linkToRetirements = (
    <Link href={`/retirements/${props.pageAddress}`} passHref>
      <div className={styles.retirementsLink}>
        <LaunchIcon />
      </div>
    </Link>
  );

  return (
    <BaseCard
      title={t({
        id: "pledges.dashboard.retirements.title",
        message: "Retirements",
      })}
      icon={<LocalFireDepartmentIcon fontSize="large" />}
      action={linkToRetirements}
    >
      <div className={styles.value}>
        {props.retirements ? (
          <Text t="h1" uppercase>
            {totalTonnesRetired}
          </Text>
        ) : (
          <Text t="h4" color="lightest">
            <Trans id="shared.loading">Loading...</Trans>
          </Text>
        )}

        <Text t="h4" color="lightest">
          <Trans id="pledges.dashboard.retirements.total_tonnes_retired">
            Total Carbon Tonnes Retired
          </Trans>
        </Text>
      </div>

      {props.retirements && Number(props.retirements.totalTonnesRetired) > 0 && (
        <div className={styles.chartContainer}>
          <RetirementsChart retirements={props.retirements} />
        </div>
      )}
    </BaseCard>
  );
};
