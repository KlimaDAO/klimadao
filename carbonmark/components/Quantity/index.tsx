import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";

import * as styles from "./styles";

type Props = {
  quantity: number;
};

export const Quantity: FC<Props> = (props) => {
  return (
    <Text t="body2" className={styles.quantity}>
      <Trans>{props.quantity} tonnes</Trans>
    </Text>
  );
};
