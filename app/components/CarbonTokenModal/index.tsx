import { Text } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Modal } from "components/Modal";
import * as styles from "./styles";

export const CarbonTokenModal = ({ holdings }: any) => {
  return (
    <Modal title={t`Select Token`} onToggleModal={() => {}}>
      <div className={styles.container}>
        {holdings?.holdings?.map((token: any) => (
          <div key={token.id} className={styles.item}>
            {/* TODO - regex on the symbol to remove C3-/TCO2- from symbol?? */}
            <Text>{token?.token.symbol}</Text>
            <Text>tonnes available</Text>
          </div>
        ))}
      </div>
    </Modal>
  );
};
