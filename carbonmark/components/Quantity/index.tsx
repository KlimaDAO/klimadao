import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";

import { formatTonnes } from "@klimadao/lib/utils";
import * as styles from "./styles";

type Props = {
  quantity: number;
  locale?: string;
  className?: string;
};

/**
 * Display a quantity of credits in a tagged form
 * FIXME: There is factorization potential with tag components (Quantity/Vintage/Category)
 * @param props
 * @returns
 */
export const Quantity: FC<Props> = (props) => {
  const formattedAmount = formatTonnes({
    amount: props.quantity.toString(),
    locale: props.locale || "en",
  });

  return (
    <Text t="body3" className={`${props.className} ${styles.quantity}`}>
      <Trans>{formattedAmount} tonnes</Trans>
    </Text>
  );
};
