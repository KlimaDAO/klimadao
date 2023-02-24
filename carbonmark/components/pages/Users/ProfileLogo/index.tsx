import { cx } from "@emotion/css";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { FC, useState } from "react";
import * as styles from "./styles";

type Props = {
  isCarbonmarkUser: boolean;
  profileImgUrl?: string;
  className?: string;
  hasBorder?: boolean;
};

export const ProfileLogo: FC<Props> = (props) => {
  const [hasValidImageUrl, setHasValidImageUrl] = useState(
    !!props.profileImgUrl
  );

  return (
    <div
      className={cx(styles.profileLogo, props.className, {
        hasBorder: props.hasBorder,
      })}
    >
      {props.isCarbonmarkUser && hasValidImageUrl ? (
        <img
          src={props.profileImgUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            setHasValidImageUrl(false);
          }}
          alt="Carbonmark User Logo"
          className="imgUrl"
          width={50}
          height={50}
        />
      ) : (
        <PermIdentityOutlinedIcon className="placeholderIcon" />
      )}
    </div>
  );
};
