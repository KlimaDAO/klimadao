import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { notNil } from "lib/utils/functional.utils";
import { FC } from "react";
import * as styles from "./styles";

export const UserProfile: FC = () => {
  const { address, networkLabel } = useWeb3();
  const { data: carbonmarkUser } = useGetUsersWalletorhandle(
    address!,
    { network: networkLabel },
    { shouldFetch: notNil(address) }
  );

  return (
    <div className={styles.userProfile}>
      <div className="content">
        {!!carbonmarkUser && carbonmarkUser.profileImgUrl ? (
          <ProfileLogo
            isCarbonmarkUser={!!carbonmarkUser}
            profileImgUrl={carbonmarkUser?.profileImgUrl}
          />
        ) : (
          <div className="placeholder">
            <PermIdentityOutlinedIcon className="placeholderIcon" />
          </div>
        )}
        {!!carbonmarkUser?.username
          ? carbonmarkUser.username
          : concatAddress(`${address}`)}
      </div>
    </div>
  );
};
