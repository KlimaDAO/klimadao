import React, { FC } from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";

type Props = {
  methodology: string;
};

export const MethodologyCard: FC<Props> = (props) => {
  return (
    <BaseCard
      title="Methodology"
      icon={<HowToRegOutlinedIcon fontSize="large" />}
    >
      <Text t="body2">
        <em>"{props.methodology}"</em>
      </Text>
    </BaseCard>
  );
};
