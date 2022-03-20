import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";
// import * as styles from "./styles";

type Props = {};

export const PledgeCard: React.FC<Props> = (props) => (
  <BaseCard title="Pledge" icon={<MailOutlineIcon fontSize="large" />}>
    <Text t="body2">
      <em>
        "Arabica Acerbic Affogato Aftertaste Aged Americano And Aroma robust
        robusta, single panna to press ristretto con french ut, dark affogato
        turkish cup frappuccino"
      </em>
    </Text>
  </BaseCard>
);
