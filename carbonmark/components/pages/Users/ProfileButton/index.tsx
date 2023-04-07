import { t } from "@lingui/macro";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { FC } from "react";
import * as styles from "./styles";

/** A responsive button to allow the user to edit their profile */
export const ProfileButton: FC<{ onClick: () => void }> = (props) => {
  return (
    <ButtonPrimary
      label={t`Edit Profile`}
      className={styles.profileButtonStyle}
      variant="gray"
      icon={<ModeEditOutlinedIcon />}
      onClick={props.onClick}
    />
  );
};
