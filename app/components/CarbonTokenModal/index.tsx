import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import { Modal } from "components/Modal";
import { formatUnits } from "ethers-v6";
import { CarbonToken } from "lib/queryUserCarbonTokens";
import * as styles from "./styles";

type Props = {
  holdings: Array<CarbonToken> | null;
  onSelect: (item: CarbonToken) => void;
  onHide: () => void;
};

export const CarbonTokenModal: React.FC<Props> = (props) => {
  const handleChange = (item: CarbonToken) => {
    props.onSelect(item);
    props.onHide();
  };

  return (
    <Modal title={t`Select Token`} onToggleModal={props.onHide}>
      <div className={styles.container}>
        {props.holdings?.map((holding) => (
          <div
            key={holding.id}
            className={cx(styles.item, {
              [styles.incompatible]: !holding.token.symbol.startsWith("TCO2"),
            })}
            onClick={() => handleChange(holding)}
          >
            {/* TODO - regex on the symbol to remove C3-/TCO2- from symbol?? */}
            <div>
              <Text className={styles.tokenText}>
                <Trans>{holding.token.symbol}</Trans>
              </Text>
              <Text className={styles.tonnesText}>
                <Trans>
                  {formatUnits(holding.amount, holding.token.decimals)} tonnes
                  available
                </Trans>
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
