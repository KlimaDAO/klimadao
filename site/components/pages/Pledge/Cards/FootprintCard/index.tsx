import React from "react";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

type Props = {};

export const FootprintCard: React.FC<Props> = (props) => (
  <BaseCard
    title="Footprint"
    icon={<LocalGasStationOutlinedIcon fontSize="large" />}
  />
);
