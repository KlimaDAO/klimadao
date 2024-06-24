import { Text } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
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
    <Modal title={t`Select Token`} onToggleModal={() => {}}>
      <div className={styles.container}>
        {holdings?.map((holding: any) => (
          <div key={holding.id} className={styles.item}>
            {/* TODO - regex on the symbol to remove C3-/TCO2- from symbol?? */}
            <Text>{holding.token.symbol}</Text>
            {/* TODO - localised strings */}
            <Text>{formatEther(holding.amount)} tonnes available</Text>
          </div>
        ))}
      </div>
    </Modal>
  );
};
