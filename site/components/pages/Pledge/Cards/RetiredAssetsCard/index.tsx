import React from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

type Props = {};

export const RetiredAssetsCard: React.FC<Props> = (props) => (
  <BaseCard
    title="Retired Assets"
    icon={<LocalFireDepartmentIcon fontSize="large" />}
  />
);
