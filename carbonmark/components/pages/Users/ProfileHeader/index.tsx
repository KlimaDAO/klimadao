import { Trans } from "@lingui/macro";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Text } from "components/Text";
import Image from "next/legacy/image";
import userLogo from "public/user_default_avatar.png";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  userName: string;
  description?: string;
  isCarbonmarkUser: boolean;
};

export const ProfileHeader: FC<Props> = (props) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileLogo}>
        {props.isCarbonmarkUser ? (
          <Image
            src={userLogo}
            alt="Carbonmark User Logo"
            width={50}
            height={50}
          />
        ) : (
          <PermIdentityOutlinedIcon className="notRegisteredSvg" />
        )}
      </div>
      <div className={styles.profileText}>
        <Text t="h4">{props.userName}</Text>

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
