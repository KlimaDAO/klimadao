import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";

import { formatTonnes } from "@klimadao/lib/utils";
import * as styles from "./styles";

type Props = {
  quantity: number;
  locale?: string;
};

export const Quantity: FC<Props> = (props) => {
  const formattedAmount = formatTonnes({
    amount: props.quantity.toString(),
    locale: props.locale || "en",
  });

  return (
    <Text t="body2" className={styles.quantity}>
      <Trans>{formattedAmount} tonnes</Trans>
    </Text>
  );
};
