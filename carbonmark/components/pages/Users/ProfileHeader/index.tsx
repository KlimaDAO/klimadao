import { Trans } from "@lingui/macro";
import { Text } from "components/Text";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { useConnectedUser } from "hooks/useConnectedUser";
import { User } from "lib/types/carbonmark.types";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  carbonmarkUser: User | null;
  userName: string;
  userAddress: string;
};

export const ProfileHeader: FC<Props> = (props) => {
  const isCarbonmarkUser = !!props.carbonmarkUser;
  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(
    props.userAddress
  );

  return (
    <div className={styles.profileHeader}>
      <ProfileLogo
        isCarbonmarkUser={isCarbonmarkUser}
        profileImgUrl={props.carbonmarkUser?.profileImgUrl}
      />
      <div className={styles.profileText}>
        <div className={styles.titles}>
          <Text t="h4">{props.carbonmarkUser?.username || props.userName}</Text>
          {props.carbonmarkUser?.handle && (
            <Text t="h4" className="handle">
              @{props.carbonmarkUser.handle}
            </Text>
          )}
        </div>
        {!isCarbonmarkUser && isConnectedUser && (
          <Text t="body1">
            <Trans>
              Click the 'create profile' button to customize this page and get
              started.
            </Trans>
          </Text>
        )}
        {!isCarbonmarkUser && isUnconnectedUser && (
          <Text t="body1">
            <Trans>This user has not yet created a carbonmark profile.</Trans>
          </Text>
        )}

        {isCarbonmarkUser &&
          isConnectedUser &&
          !props.carbonmarkUser?.description && (
            <Text t="body1">
              <Trans id="profile.edit_your_profile">
                Edit your profile to add a description.
              </Trans>
            </Text>
          )}

        {isCarbonmarkUser && props.carbonmarkUser?.description && (
          <Text t="body1">{props.carbonmarkUser.description}</Text>
        )}
      </div>
    </div>
  );
};
