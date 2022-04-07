import React, { FC } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { BaseCard } from "../BaseCard";

export const AssetsOverTimeCard: FC = () => (
  <BaseCard
    title="Pledge vs Assets"
    icon={<EmailOutlinedIcon fontSize="large" />}
  />
);
