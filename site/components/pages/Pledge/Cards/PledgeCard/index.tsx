import React, { FC } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";

type Props = {
  pledge: string;
};

export const PledgeCard: FC<Props> = (props) => {
  const pledge = props.pledge || "Write your pledge today";

  return (
    <BaseCard title="Pledge" icon={<MailOutlineIcon fontSize="large" />}>
      <Text t="body2">
        <em>"{pledge}"</em>
      </Text>
    </BaseCard>
  );
};
