import React, { FC, useEffect, useState } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Text } from "@klimadao/lib/components";
import {
  trimStringDecimals,
  getRetirementTotalsAndBalances,
} from "@klimadao/lib/utils";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  pageAddress: string;
};

export const RetirementsCard: FC<Props> = (props) => {
  const [retirements, setRetirements] =
    useState<RetirementsTotalsAndBalances | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const retirements = await getRetirementTotalsAndBalances({
          address: props.pageAddress,
        });
        setRetirements(retirements);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const totalTonnesRetired =
    retirements && Number(retirements.totalTonnesRetired) > 0
      ? trimStringDecimals(retirements.totalTonnesRetired, 2)
      : 0;

  return (
    <BaseCard
      title="Retired Assets"
      icon={<LocalFireDepartmentIcon fontSize="large" />}
    >
      <div className={styles.value}>
        {retirements ? (
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
    </BaseCard>
  );
};
