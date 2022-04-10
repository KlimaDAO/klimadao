import React, { FC } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";

type Props = {
  pledge: string;
};

export const PledgeCard: FC<Props> = (props) => {
  return (
    <BaseCard title="Pledge" icon={<MailOutlineIcon fontSize="large" />}>
      <Text t="body2">
        <em>"{props.pledge}"</em>
      </Text>
    </BaseCard>
  );
};
