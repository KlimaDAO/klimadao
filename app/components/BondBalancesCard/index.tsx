import { Text } from "@klimadao/lib/components";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { useSelector } from "react-redux";
import * as styles from "./styles";
import { FC } from "react";
import { RootState } from "state";
import { Bond } from "@klimadao/lib/constants";
import { useBond } from "components/views/ChooseBond";

interface Props {
  bond: Bond;
  // tooltip
}

export const BondBalancesCard: FC<Props> = (props) => {
  const { name } = useBond(props.bond);
  const bondState = useSelector((state: RootState) => state.bonds[props.bond]);

  return (
    <div className={styles.card + " " + status}>
      <div className="header">
        <Text t="h4" className="title">
          <AccountBalanceOutlined />
          Balances
        </Text>
        {/* <InfoButton content={props.tooltip} /> */}
      </div>

      <div className="cardContent">
        <div className="stack">
          <Text className="value">
            {trimWithPlaceholder(bondState?.balance ?? 0, 9)}
          </Text>
          <Text className="label" color="lightest">
            {name}
          </Text>
        </div>
        <div className="stack">
          <Text className="value">
            {trimWithPlaceholder(
              bondState?.pendingPayout ?? 0,
              Number(bondState?.pendingPayout) < 1 ? 5 : 2
            )}
          </Text>
          <Text className="label" color="lightest">
            Pending KLIMA
          </Text>
        </div>
      </div>
    </div>
  );
};
