import {
  ProvenanceRecord,
  Retirement,
} from ".generated/carbonmark-api-sdk/types";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import BalanceOutlined from "@mui/icons-material/BalanceOutlined";
import Token from "@mui/icons-material/Token";
import { Text } from "components/Text";
import { useRouter } from "next/router";
import { ProvenanceTimeline } from "../ProvenanceTimeline";
import * as styles from "./styles";

interface ProvenanceComponentProps {
  records: ProvenanceRecord[];
  retirement: Retirement;
}

/**
 * Displays provenance records formatted as a timeline
 * @param props
 * @returns
 */
export const ProvenanceComponent = (props: ProvenanceComponentProps) => {
  const { locale } = useRouter();

  // Do not display anything if we do not have at least a record
  const lastRecord = props.records[0];
  if (!lastRecord) return <Trans>No records found</Trans>;

  /** Formats tons */
  const formattedAmount = formatTonnes({
    amount: lastRecord.originalAmount.toString(),
    locale: locale || "en",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Text
            t="responsiveBody2"
            color="lightest"
            className={styles.iconAndText}
          >
            <Token fontSize="large" />
            <Trans>Credit ID</Trans>
          </Text>
          <Text t="h5">
            {props.retirement.credit?.id &&
              concatAddress(props.retirement.credit?.id)}
          </Text>
        </div>
        <div className={styles.headerItem}>
          <Text
            t="body2"
            color="lightest"
            className={`${styles.iconAndText} ${styles.right}`}
          >
            <BalanceOutlined fontSize="large" />
            <Trans>Amount</Trans>
          </Text>
          <Text t="h5">
            <Trans>{formattedAmount} Tonnes</Trans>
          </Text>
        </div>
      </div>
      <ProvenanceTimeline {...props} />
    </div>
  );
};
