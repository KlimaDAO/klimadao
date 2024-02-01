import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { Anchor as A } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { Text } from "components/Text";
import { urls } from "lib/constants";
import { notNil } from "lib/utils/functional.utils";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  beneficiary: string;
  beneficiaryAddress: string;
};

export const BeneficiaryDetails: FC<Props> = (props) => {
  const { networkLabel } = useWeb3();
  const { data: carbonmarkUser } = useGetUsersWalletorhandle(
    props.beneficiaryAddress,
    { network: networkLabel },
    { shouldFetch: notNil(props.beneficiaryAddress) }
  );
  return (
    <div className={styles.beneficiaryCard}>
      {!!carbonmarkUser && !!carbonmarkUser.profileImgUrl && (
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
          {carbonmarkUser?.handle ||
            props.beneficiary ||
            t({
              id: "retirement.single.beneficiary.placeholder",
              message: "No beneficiary name provided",
            })}
        </Text>
        <A
          className={styles.profileLink}
          href={`${urls.users}/${
            carbonmarkUser?.handle || props.beneficiaryAddress
          }`}
        >
          {t`View Carbonmark Profile`}
          <LaunchIcon />
        </A>
      </div>
    </div>
  );
};
