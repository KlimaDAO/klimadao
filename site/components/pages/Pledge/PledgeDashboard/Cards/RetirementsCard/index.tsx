import React, { FC } from "react";
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
      <a title="View retirements">
        <div className={styles.retirementsLink}>
          <LaunchIcon />
        </div>
      </a>
    </Link>
  );

  return (
    <BaseCard
      title="Retirements"
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
            Loading...
          </Text>
        )}

        <Text t="h4" color="lightest">
          Total Carbon Tonnes Retired
        </Text>
      </div>

      {props.retirements && (
        <div className={styles.chartContainer}>
          <RetirementsChart retirements={props.retirements} />
        </div>
      )}
    </BaseCard>
  );
};
