import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { formatToPrice } from "lib/formatNumbers";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "../styles";

export interface Props {
  price: string;
}

export const Price: FC<Props> = (props) => {
  const { locale } = useRouter();
  return (
    <div className={styles.price}>
      <Text t="h4">
        {formatToPrice(props.price, locale)} <Trans>each</Trans>
      </Text>
    </div>
  );
};
