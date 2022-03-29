import React, { FC } from "react";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

export const FootprintCard: FC = () => (
  <BaseCard
    title="Footprint"
    icon={<LocalGasStationOutlinedIcon fontSize="large" />}
  >
    <div className={styles.value}>
      <Text t="h1" uppercase>
        123k
      </Text>
      <Text t="h4" color="lightest" uppercase>
        Tonnes
      </Text>
    </div>
  </BaseCard>
);
