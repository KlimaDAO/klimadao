import { Text } from "@klimadao/lib/components";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { useSelector } from "react-redux";
import { InfoButton } from "components/InfoButton";
import { selectBalances } from "state/selectors";
import * as styles from "./styles";

export const BalancesCard = () => {
  const balances = useSelector(selectBalances);
  return (
    <div className={styles.card + " " + status}>
      <div className="header">
        <Text t="h4" className="title">
          <AccountBalanceOutlined fontSize="large" />
          Balances
        </Text>
        <InfoButton content="Stake your KLIMA tokens to receive sKLIMA. After every rebase, your sKLIMA balance will increase by the given percentage." />
      </div>
      <div className="stack">
        <Text t="h2_alt">{trimWithPlaceholder(balances?.klima, 9)}</Text>
        <Text t="h4" color="lightest">
          KLIMA
        </Text>
      </div>
      <div className="stack">
        <Text t="h2_alt">{trimWithPlaceholder(balances?.sklima, 9)}</Text>
        <Text t="h4" color="lightest">
          sKLIMA
        </Text>
      </div>
    </div>
  );
};
