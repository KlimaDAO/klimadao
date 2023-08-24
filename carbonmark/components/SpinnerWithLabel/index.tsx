import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { Spinner } from "components/shared/Spinner";
import * as styles from "./styles";

interface Props {
  label?: string;
}

/** Default label says Loading... */
export const SpinnerWithLabel = (props: Props) => {
  return (
    <div className={styles.spinnerWithLabel}>
      <Spinner />
      <Text>{props.label ?? <Trans>Loading...</Trans>}</Text>
    </div>
  );
};
