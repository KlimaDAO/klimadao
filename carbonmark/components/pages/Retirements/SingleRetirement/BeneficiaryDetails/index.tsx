import { Anchor as A } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { Text } from "components/Text";
import { useFetchUser } from "hooks/useFetchUser";
import { urls } from "lib/constants";
import isUndefined from "lodash/isUndefined";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  beneficiary: string;
  beneficiaryAddress: string;
};

export const BeneficiaryDetails: FC<Props> = (props) => {
  const { address } = useWeb3();
  const { carbonmarkUser } = useFetchUser(props.beneficiaryAddress);
  return (
    <div className={styles.beneficiaryCard}>
      {!!carbonmarkUser && (
        <div className={styles.beneficiaryLogo}>
          <ProfileLogo
            isCarbonmarkUser={!!carbonmarkUser}
            profileImgUrl={carbonmarkUser?.profileImgUrl}
          />
        </div>
      )}
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
        <A
          className={styles.profileLink}
          href={
            isUndefined(address)
              ? `${urls.users}/login`
              : `${urls.users}/${address}`
          }
        >
          {t`View Carbonmark Profile`}
          <LaunchIcon />
        </A>
      </div>
    </div>
  );
};
