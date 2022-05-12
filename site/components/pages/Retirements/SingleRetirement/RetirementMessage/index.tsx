import { Text } from "@klimadao/lib/components";
import * as styles from "./styles";
import { FC } from "react";
import { Trans } from "@lingui/macro";

type Props = {
  message: string;
};

export const RetirementMessage: FC<Props> = ({ message }) => {
  return (
    <div className={styles.retirementMessage_textGroup}>
      <Text t="caption" align="center" color="lightest" uppercase>
        <Trans id="retirement.single.message.title">Retirement Message</Trans>
      </Text>
      <Text t="h4" align="center" className="message">
        <q>{message}</q>
      </Text>
    </div>
  );
};
