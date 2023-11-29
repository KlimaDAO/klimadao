import { Twirl } from "hamburger-react";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  isToggled: boolean;
  onClick: () => void;
}

export const ToggleNavButton: FC<Props> = (props) => {
  return (
    <button
      type="button"
      className={styles.buttonToggleNav}
      onClick={props.onClick}
    >
      <Twirl size={20} toggled={props.isToggled} />
    </button>
  );
};
