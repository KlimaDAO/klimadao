import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

type Props = {};

export const PledgeCard: React.FC<Props> = (props) => (
  <BaseCard title="Pledge" icon={<MailOutlineIcon fontSize="large" />} />
);
