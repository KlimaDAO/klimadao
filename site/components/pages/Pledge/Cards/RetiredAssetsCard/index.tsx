import React, { FC } from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

// type Props = {};

export const RetiredAssetsCard: FC = () => (
  <BaseCard
    title="Retired Assets"
    icon={<LocalFireDepartmentIcon fontSize="large" />}
  >
    <div className={styles.value}>
      <Text t="h1" uppercase>
        79k
      </Text>
      <Text t="h4" color="lightest">
        Total Carbon Tonnes Retired
      </Text>
    </div>
  </BaseCard>
);
