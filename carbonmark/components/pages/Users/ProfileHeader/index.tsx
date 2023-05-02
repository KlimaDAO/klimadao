import { Trans } from "@lingui/macro";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { Text } from "components/Text";
import { User } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  carbonmarkUser: User | null;
  userName: string;
};

export const ProfileHeader: FC<Props> = (props) => {
  const isCarbonmarkUser = !!props.carbonmarkUser;

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
        {!isCarbonmarkUser && (
          <Text t="body1">
            <Trans id="profile.create_your_profile">
              Create your profile on Carbonmark and start selling
            </Trans>
          </Text>
        )}

        {isCarbonmarkUser && !props.carbonmarkUser?.description && (
          <Text t="body1">
            <Trans id="profile.edit_your_profile">
              Edit your profile to add a description
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
