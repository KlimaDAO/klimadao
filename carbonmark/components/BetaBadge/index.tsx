import { t, Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import * as styles from "./styles";

export const BetaBadge = () => {
  return (
    <TextInfoTooltip
      tooltip={t`This product is still in Beta and audits have not been completed yet.`}
    >
      <span className={styles.betaBadge}>
        <Text t="button" className="badgeText">
          <Trans>BETA</Trans>
        </Text>
      </span>
    </TextInfoTooltip>
  );
};
