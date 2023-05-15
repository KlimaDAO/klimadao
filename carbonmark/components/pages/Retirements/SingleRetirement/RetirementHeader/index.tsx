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
        Proof of
      </Text>
      <Text t="h3">Carbon Credit Retirement</Text>
    </div>
    <div className={styles.retirementGroup}>
      <Text t="h1" className="amount">
        {props.formattedAmount}t
      </Text>
      <Text t="button" color="lightest">
        Verified tonnes of carbon retired
      </Text>
    </div>
  </>
);
