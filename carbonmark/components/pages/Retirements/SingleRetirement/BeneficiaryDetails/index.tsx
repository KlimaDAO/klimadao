import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  beneficiary: string;
};

export const BeneficiaryDetails: FC<Props> = (props) => (
  <div className={styles.beneficiaryCard}>
    <div className={styles.beneficiaryLogo}>
      <PermIdentityOutlinedIcon className="placeholderIcon" />
    </div>
    <div className={styles.content}>
      <Text t="button" color="lightest" uppercase>
        <Trans id="retirement.single.beneficiary.title">Beneficiary:</Trans>
      </Text>
      <Text t="h4">
        {props.beneficiary ||
          t({
            id: "retirement.single.beneficiary.placeholder",
            message: "No beneficiary name provided",
          })}
      </Text>
      <Text t="button" uppercase className={styles.profileLink}>
        View Carbonmark Profile
        <LaunchIcon />
      </Text>
    </div>
  </div>
);
