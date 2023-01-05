import { css } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { FC } from "react";

import { BaseCard } from "../BaseCard";

type Props = {
  pledge: string;
};

export const PledgeCard: FC<Props> = (props) => {
  const defaultText = t({
    id: "pledges.dashboard.pledge.default_text",
    message: "Write your pledge today!",
  });

  return (
    <BaseCard
      title={t({
        id: "pledges.dashboard.pledge.title",
        message: "Pledge",
      })}
      icon={<MailOutlineIcon fontSize="large" />}
    >
      <Text
        t="body2"
        className={css`
          white-space: pre-line;
        `}
      >
        <em>"{props.pledge || defaultText}"</em>
      </Text>
    </BaseCard>
  );
};
