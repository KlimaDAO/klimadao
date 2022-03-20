import React from "react";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

type Props = {};

export const ActiveAssetsCard: React.FC<Props> = (props) => (
  <BaseCard title="Carbon Assets" icon={<CloudQueueIcon fontSize="large" />} />
);
