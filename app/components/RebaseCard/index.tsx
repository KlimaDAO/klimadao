import { Text } from "@klimadao/lib/components";
import Sync from "@mui/icons-material/Sync";
import { useSelector } from "react-redux";
import { InfoButton } from "components/InfoButton";
import { selectAppState, selectBalances } from "state/selectors";
import * as styles from "./styles";
import { secondsUntilBlock, trimWithPlaceholder } from "@klimadao/lib/utils";
import { FC } from "react";

interface Props {
  isConnected?: boolean;
}

export const RebaseCard: FC<Props> = (props) => {
  const balances = useSelector(selectBalances);
  const { stakingRebase, currentBlock, rebaseBlock } =
    useSelector(selectAppState);
  const nextRebasePercent = stakingRebase ? stakingRebase * 100 : 0;
  const nextRebaseValue =
    stakingRebase &&
    balances?.sklima &&
    stakingRebase * Number(balances.sklima);

  const timeUntilRebase = () => {
    if (currentBlock && rebaseBlock) {
      const seconds = secondsUntilBlock(currentBlock, rebaseBlock);
      // if less than 1 hour remaining, return minutes
      const rtf = new Intl.RelativeTimeFormat();
      if (seconds < 3600) {
        return rtf.format(Math.floor(seconds / 60), "minutes");
      } else {
        return rtf.format(Number((seconds / 3600).toPrecision(2)), "hours");
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className="header">
        <Text t="h4" className="title">
          <Sync />
          Rebase
        </Text>
        <InfoButton content="The protocol automatically mints and distributes rewards. Your payout is a percentage of your sKLIMA balance." />
      </div>
      <div className="cardContent">
        <div className="stack">
          <Text className="value">{timeUntilRebase() ?? "Loading..."}</Text>
          <Text className="label" color="lightest">
            Approx. next rebase
          </Text>
        </div>
        <div className="stack">
          <Text className="value">
            {stakingRebase
              ? `${trimWithPlaceholder(nextRebasePercent, 2)}%`
              : "Loading..."}
          </Text>
          <Text className="label" color="lightest">
            Percent payout
          </Text>
        </div>
        {props.isConnected && (
          <div className="stack">
            <Text className="value">
              {trimWithPlaceholder(nextRebaseValue, 6)}
            </Text>
            <Text className="label" color="lightest">
              Est. payout (sKLIMA)
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
