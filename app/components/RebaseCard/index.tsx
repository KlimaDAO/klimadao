import { Text } from "@klimadao/lib/components";
import Sync from "@mui/icons-material/Sync";
import { useSelector } from "react-redux";
import { InfoButton } from "components/InfoButton";
import { selectAppState, selectBalances } from "state/selectors";
import * as styles from "./styles";
import { secondsUntilBlock, trimWithPlaceholder } from "@klimadao/lib/utils";

export const RebaseCard = () => {
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
        return rtf.format(seconds / 3600, "hours");
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className="header">
        <Text t="h5" className="title">
          <Sync fontSize="large" />
          Rebase
        </Text>
        <InfoButton content="The protocol automatically mints and distributes rewards at regular intervals. This is called 'rebasing'. Your payout is a percentage of your sKLIMA balance." />
      </div>
      <div className="stack">
        <Text t="h2_alt">{timeUntilRebase() ?? "Loading..."}</Text>
        <Text t="h4" color="lightest">
          Approx. next rebase
        </Text>
      </div>
      <div className="stack">
        <Text t="h2_alt">{trimWithPlaceholder(nextRebasePercent, 2)}%</Text>
        <Text t="h4" color="lightest">
          Percent payout
        </Text>
      </div>
      <div className="stack">
        <Text t="h2_alt">{trimWithPlaceholder(nextRebaseValue, 6)}</Text>
        <Text t="h4" color="lightest">
          Est. payout (sKLIMA)
        </Text>
      </div>
    </div>
  );
};
