import React, { FC } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

// type Props = {};

export const AssetsOverTimeCard: FC = () => (
  <BaseCard
    title="Pledge vs Assets"
    icon={<EmailOutlinedIcon fontSize="large" />}
  />
);
