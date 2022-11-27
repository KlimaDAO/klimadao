import { Text } from "@klimadao/lib/components";
import { Bond } from "@klimadao/lib/constants";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import { useBond } from "components/views/ChooseBond";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state";
import { selectLocale } from "state/selectors";
import * as styles from "./styles";

interface Props {
  bond: Bond;
  // tooltip
}

export const BondBalancesCard: FC<Props> = (props) => {
  const { name } = useBond(props.bond);
  const bondState = useSelector((state: RootState) => state.bonds[props.bond]);
  const locale = useSelector(selectLocale);

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
            {trimWithPlaceholder(bondState?.balance ?? 0, 9, locale)}
          </Text>
          <Text className="label" color="lightest">
            {name}
          </Text>
        </div>
        <div className="stack">
          <Text className="value">
            {trimWithPlaceholder(
              bondState?.pendingPayout ?? 0,
              Number(bondState?.pendingPayout) < 1 ? 5 : 2,
              locale
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
