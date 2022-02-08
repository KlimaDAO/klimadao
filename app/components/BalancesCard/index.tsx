import { Text } from "@klimadao/lib/components";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { useSelector } from "react-redux";
import { InfoButton } from "components/InfoButton";
import { selectBalances } from "state/selectors";
import * as styles from "./styles";
import { FC } from "react";

interface Props {
  isConnected?: boolean;
}

export const BalancesCard: FC<Props> = (props) => {
  const balances = useSelector(selectBalances);
  return (
    <div className={styles.card + " " + status}>
      <div className="header">
        <Text t="h4" className="title">
          <AccountBalanceOutlined />
          Balances
        </Text>
        <InfoButton content="Stake your KLIMA tokens to receive sKLIMA. After every rebase, your sKLIMA balance will increase by the given percentage." />
      </div>
      <div className="cardContent">
        <div className="stack">
          <Text className="value">
            {props.isConnected ? trimWithPlaceholder(balances?.klima, 9) : 0}
          </Text>
          <Text className="label" color="lightest">
            KLIMA
          </Text>
        </div>
        <div className="stack">
          <Text className="value">
            {props.isConnected
              ? trimWithPlaceholder(balances?.sklima ?? 0, 9)
              : 0}
          </Text>
          <Text className="label" color="lightest">
            sKLIMA
          </Text>
        </div>
      </div>
    </div>
  );
};
