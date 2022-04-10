import React, { FC } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Text } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";

import { Retirements } from "lib/getRetirements";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  retirements: Retirements;
};

export const RetiredAssetsCard: FC<Props> = (props) => (
  <BaseCard
    title="Retired Assets"
    icon={<LocalFireDepartmentIcon fontSize="large" />}
  >
    <div className={styles.value}>
      <Text t="h1" uppercase>
        {trimStringDecimals(props.retirements.totalTonnesRetired, 2)}k
      </Text>
      <Text t="h4" color="lightest">
        Total Carbon Tonnes Retired
      </Text>
    </div>
  </BaseCard>
);
