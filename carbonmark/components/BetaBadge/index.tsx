import { isTestnetChainId, useWeb3 } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import * as styles from "./styles";

export const BetaBadge = () => {
  const web3 = useWeb3();
  return (
    <TextInfoTooltip
      tooltip={t`This product is still in Beta and audits have not been completed yet.`}
    >
      <span className={styles.betaBadge}>
        <Text t="button" className="badgeText">
          {isTestnetChainId(web3?.network?.chainId) ? (
            <Trans>TESTNET</Trans>
          ) : (
            <Trans>BETA</Trans>
          )}
        </Text>
      </span>
    </TextInfoTooltip>
  );
};
