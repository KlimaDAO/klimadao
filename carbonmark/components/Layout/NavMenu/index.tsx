import { Domain } from "@klimadao/lib/types/domains";
import { Trans } from "@lingui/macro";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StoreIcon from "@mui/icons-material/Store";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import { useConnectedUser } from "hooks/useConnectedUser";
import { useRouter } from "next/router";
import { MenuButton } from "../MenuButton";
interface Props {
  userAddress?: string;
  connectedAddress?: string;
  connectedDomain?: Domain;
}
export const NavMenu: React.FC<Props> = (props) => {
  const { pathname } = useRouter();
  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(
    props.userAddress
  );
  const isConnected = !!props.connectedAddress || !!props.connectedDomain;
  const profileLink = isConnected
    ? `/users/${props.connectedAddress}`
    : `/users/login`;
  return (
    <>
      <MenuButton
        isActive={
          pathname.startsWith("/projects") ||
          pathname.startsWith("/purchase") ||
          isUnconnectedUser
        }
        href={"/projects"}
        icon={<StoreIcon />}
      >
        <Trans id="menu.marketplace">Marketplace</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname.startsWith(`/users/login`) || isConnectedUser}
        href={profileLink}
        icon={<PermIdentityIcon />}
      >
        <Trans id="menu.profile">Profile</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname.startsWith("/portfolio")}
        href="/portfolio"
        icon={<ViewQuiltOutlinedIcon />}
      >
        <Trans id="menu.portfolio">Portfolio</Trans>
      </MenuButton>
    </>
  );
};
