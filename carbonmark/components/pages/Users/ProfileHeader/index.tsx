import { Trans } from "@lingui/macro";
import { ProfileLogo } from "components/pages/Users/ProfileLogo";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  userName: string;
  description?: string;
  isCarbonmarkUser: boolean;
  profileImgUrl?: string;
  handle?: string;
};

export const ProfileHeader: FC<Props> = (props) => {
  return (
    <div className={styles.profileHeader}>
      <ProfileLogo
        isCarbonmarkUser={props.isCarbonmarkUser}
        profileImgUrl={props.profileImgUrl}
      />
      <div className={styles.profileText}>
        <div className={styles.titles}>
          <Text t="h4">{props.userName}</Text>
          {props.handle && (
            <Text t="h4" className="handle">
              @{props.handle}
            </Text>
          )}
        </div>
        {!props.isCarbonmarkUser && (
          <Text t="body1">
            <Trans id="profile.create_your_profile">
              Create your profile on Carbonmark and start selling
            </Trans>
          </Text>
        )}

        {props.isCarbonmarkUser && !props.description && (
          <Text t="body1">
            <Trans id="profile.edit_your_profile">
              Edit your profile to add a description
            </Trans>
          </Text>
        )}

        {props.isCarbonmarkUser && props.description && (
          <Text t="body1">{props.description}</Text>
        )}
      </div>
    </div>
  );
};
