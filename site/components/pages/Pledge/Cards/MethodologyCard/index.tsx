import React from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

type Props = {};

export const MethodologyCard: React.FC<Props> = (props) => (
  <BaseCard
    title="Methodology"
    icon={<HowToRegOutlinedIcon fontSize="large" />}
  />
);
