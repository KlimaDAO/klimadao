import { LogoWithClaim, Text } from "@klimadao/lib/components";
import { concatAddress } from "@klimadao/lib/utils";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Close from "@mui/icons-material/Close";
import { FC } from "react";
import * as styles from "./styles";

const MenuButton = () => {
  return (
    <button className={styles.sidebarButton}>
      <InboxIcon />
      <span>Stake KLIMA</span>
    </button>
  );
};

interface Props {
  address?: string;
  onHide?: () => void;
}

export const NavMenu: FC<Props> = (props) => {
  const handleHide = () => {
    props.onHide?.();
  };
  return (
    <nav className={styles.container}>
      <button onClick={handleHide} className="closeButton">
        <Close fontSize="large" />
      </button>
      <div>
        <LogoWithClaim />
      </div>
      <hr />
      <Text t="caption">Your Wallet Address:</Text>
      <Text t="caption" color="lightest">
        0x1234..567
      </Text>
      <Text>
        {props.address ? concatAddress(props.address) : "NOT CONNECTED"}
      </Text>
      <hr />
      <MenuButton />
      <MenuButton />
      <MenuButton />
      <MenuButton />
    </nav>
  );
};
