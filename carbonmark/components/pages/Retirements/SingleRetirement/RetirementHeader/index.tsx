import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  formattedAmount: string;
};

export const RetirementHeader: FC<Props> = (props) => (
  <>
    <div className={styles.retirementGroup}>
      <Text t="h5" color="lightest">
        <Trans id="retirement.single.proof_of.title">Proof of</Trans>
      </Text>
      <Text t="h3">
        <Trans id="retirement.single.carbon_credit_retirement.title">
          Carbon Credit Retirement
        </Trans>
      </Text>
    </div>
    <div className={styles.retirementGroup}>
      <Text t="h1" className="amount">
        {props.formattedAmount}t
      </Text>
      <Text t="button" color="lightest">
        <Trans id="retirement.single.verified_tonnes.title">
          Verified tonnes of carbon retired
        </Trans>
      </Text>
    </div>
  </>
);
