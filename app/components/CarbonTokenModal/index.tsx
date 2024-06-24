import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import { Modal } from "components/Modal";
import { formatEther } from "ethers-v6";
import * as styles from "./styles";

export type CarbonTokenHoldings = {
  holdings: Array<{
    id: string;
    amount: string;
    token: {
      decimals: number;
      id: string;
      name: string;
      symbol: string;
    };
  }>;
};

// TODO - fix types
export const CarbonTokenModal: React.FC<any> = ({ holdings }) => {
  return (
    <Modal title={t`Select Token`}>
      <div className={styles.container}>
        {holdings?.map((holding: any) => (
          <div
            key={holding.id}
            className={cx(styles.item, {
              [styles.incompatible]: !holding.token.symbol.startsWith("TCO2"),
            })}
          >
            {/* TODO - regex on the symbol to remove C3-/TCO2- from symbol?? */}
            <div>
              <Text className={styles.tokenText}>
                <Trans>{holding.token.symbol}</Trans>
              </Text>
              <Text className={styles.tonnesText}>
                <Trans>{formatEther(holding.amount)} tonnes available</Trans>
              </Text>
            </div>
            {!holding.token.symbol.startsWith("TCO2") && (
              <div className={styles.incompatibleBadge}>
                <Trans>Not compatible with BCT</Trans>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
