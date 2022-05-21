import React, { FC } from "react";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import { Text } from "@klimadao/lib/components";

import { Footprint } from "../../../types";
import { BaseCard } from "../BaseCard";
import * as styles from "./styles";

type Props = {
  footprint: Footprint[];
};

export const FootprintCard: FC<Props> = (props) => {
  const footprint = props.footprint[props.footprint.length - 1];

  return (
    <BaseCard
      title="Footprint"
      icon={<LocalGasStationOutlinedIcon fontSize="large" />}
    >
      <div className={styles.value}>
        <Text t="h1" uppercase>
          {footprint.total}k
        </Text>
        <Text t="h4" color="lightest" uppercase>
          Tonnes
        </Text>
      </div>
    </BaseCard>
  );
};
