import { Domain } from "@klimadao/lib/types/domains";
import { Trans } from "@lingui/macro";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StoreIcon from "@mui/icons-material/Store";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import { useConnectedMarketplaceUser } from "hooks/useConnectedMarketplaceUser";
import { useRouter } from "next/router";
import { MenuButton } from "../MenuButton";
interface Props {
  userAddress?: string;
  connectedAddress?: string;
  connectedDomain?: Domain;
}
export const NavMenu: React.FC<Props> = (props) => {
  const { pathname } = useRouter();
  const { isConnectedUser, isUnconnectedUser } = useConnectedMarketplaceUser(
    props.userAddress
  );
  const isConnected = !!props.connectedAddress || !!props.connectedDomain;
  const profileLink = isConnected
    ? `/marketplace/users/${
        props.connectedDomain?.name || props.connectedAddress
      }`
    : `/marketplace/users/login`;
  return (
    <>
      <MenuButton
        isActive={
          pathname.startsWith("/marketplace/projects") ||
          pathname.startsWith("/marketplace/purchase") ||
          isUnconnectedUser
        }
        href={"/marketplace/projects"}
        icon={<StoreIcon />}
      >
        <Trans id="marketplace.menu.marketplace">Marketplace</Trans>
      </MenuButton>
      <MenuButton
        isActive={
          pathname.startsWith(`/marketplace/users/login`) || isConnectedUser
        }
        href={profileLink}
        icon={<PermIdentityIcon />}
      >
        <Trans id="marketplace.menu.profile">Profile</Trans>
      </MenuButton>
      {isConnected && (
        <MenuButton
          isActive={pathname.startsWith("/marketplace/portfolio")}
          href="/marketplace/portfolio"
          icon={<ViewQuiltOutlinedIcon />}
        >
          <Trans id="marketplace.menu.portfolio">Portfolio</Trans>
        </MenuButton>
      )}
    </>
  );
};
