import React, { FC } from "react";
import { t } from "@lingui/macro";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Text } from "@klimadao/lib/components";

import { BaseCard } from "../BaseCard";

type Props = {
  methodology: string;
};

export const MethodologyCard: FC<Props> = (props) => {
  const defaultText = t({
    id: "pledges.dashboard.metholodogy.default_text",
    message: "How will you meet your pledge?",
  });

  return (
    <BaseCard
      title={t({
        id: "pledges.dashboard.metholodogy.title",
        message: "Methodology",
      })}
      icon={<DescriptionOutlinedIcon fontSize="large" />}
    >
      <Text t="body2">{props.methodology || defaultText}</Text>
    </BaseCard>
  );
};
