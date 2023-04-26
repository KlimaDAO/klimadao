import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  label: string;
  onClick: () => void;
};

export const ProfileButton: FC<Props> = (props) => {
  return (
    <ButtonPrimary
      label={props.label}
      className={styles.profileButtonStyle}
      variant="gray"
      icon={<ModeEditOutlinedIcon />}
      onClick={props.onClick}
    />
  );
};
