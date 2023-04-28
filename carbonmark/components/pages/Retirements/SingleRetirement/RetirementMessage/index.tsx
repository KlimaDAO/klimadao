import { Text } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  message: string;
};

export const RetirementMessage: FC<Props> = ({ message }) => {
  return (
    <div className={styles.retirementMessage_textGroup}>
      <Text t="caption" align="center" color="lightest" uppercase>
        <Trans id="retirement.single.message.title">Retirement Message</Trans>
      </Text>
      {message && (
        <Text t="h5" align="center" className="message">
          <q>{message}</q>
        </Text>
      )}
      {!message && (
        <Text align="center" className="fallback">
          <Trans>No retirement message provided.</Trans>
        </Text>
      )}
    </div>
  );
};
