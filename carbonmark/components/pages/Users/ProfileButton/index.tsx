import { t } from "@lingui/macro";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { useResponsive } from "hooks/useResponsive";
import { FC } from "react";
import * as styles from "./styles";

/** A responsive button to allow the user to edit their profile */
export const ProfileButton: FC<{ onClick: () => void }> = (props) => {
  const { isDesktop } = useResponsive();
  return isDesktop ? (
    <ButtonPrimary
      label={t({
        id: "button.edit_profile",
        message: "Edit Profile",
      })}
      onClick={props.onClick}
    />
  ) : (
    <ButtonPrimary
      //@tmp a temporary override to force a square button
      label=" "
      className={styles.mobileButtonStyle}
      variant="gray"
      icon={<ModeEditOutlinedIcon />}
      onClick={props.onClick}
    />
  );
};
