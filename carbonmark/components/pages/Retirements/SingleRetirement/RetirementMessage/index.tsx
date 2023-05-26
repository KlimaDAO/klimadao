import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  message: string;
};

export const RetirementMessage: FC<Props> = ({ message }) => (
  <div className={styles.retirementMessage}>
    <Text t="button" color="lightest" uppercase>
      <Trans id="retirement.single.message.title">Retirement Message:</Trans>
    </Text>
    {message && (
      <Text t="h4" className="message">
        <q>{message}</q>
      </Text>
    )}
    {!message && (
      <Text className="fallback">
        <Trans>No retirement message provided.</Trans>
      </Text>
    )}
  </div>
);
