import React, { FC } from "react";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  footprint: number[];
};

export const FootprintCard: FC<Props> = (props) => {
  return (
    <BaseCard
      title="Footprint"
      icon={<LocalGasStationOutlinedIcon fontSize="large" />}
    >
      <div className={styles.value}>
        <Text t="h1" uppercase>
          {props.footprint}k
        </Text>
        <Text t="h4" color="lightest" uppercase>
          Tonnes
        </Text>
      </div>
    </BaseCard>
  );
};
