import { ButtonPrimary, MarketplaceLogo } from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Close from "@mui/icons-material/Close";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import { AddressSection } from "../AddressSection";
import { NavMenu } from "../NavMenu";
import * as styles from "./styles";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const DynamicThemeToggle = dynamic(
  () => import("components/shared/ThemeToggle"),
  { ssr: false }
);

interface NavDrawerProps {
  userAddress?: string;
  onHide?: () => void;
}

export const NavDrawer: FC<NavDrawerProps> = (props) => {
  const { address, isConnected, disconnect, toggleModal } = useWeb3();
  // collect nameserviceDomain Data if connected and domain is in URL
  const connectedDomain = useGetDomainFromAddress(address);

  return (
    <nav className={styles.container}>
      <Link href="/" data-desktop-only>
        <MarketplaceLogo />
      </Link>
      <div className={styles.mobile.header} data-mobile-only>
        <DynamicThemeToggle />
        <ButtonPrimary
          variant="lightGray"
          className="close"
          label={<Close />}
          onClick={props.onHide}
        />
      </div>
      <div className="hr" />
      <div data-mobile-only>
        {!address && !isConnected && (
          <ButtonPrimary
            label={t({
              id: "shared.login_connect",
              message: "Login / Connect",
            })}
            onClick={toggleModal}
            className="connectButton"
          />
        )}
        {address && isConnected && (
          <ButtonPrimary
            label={concatAddress(address)}
            onClick={disconnect}
            className="connectButton"
          />
        )}
      </div>
      <div className={styles.addressContainer} data-desktop-only>
        <AddressSection domain={connectedDomain} address={address} />
      </div>
      <div className="hr" />
      <NavMenu
        userAddress={props.userAddress}
        connectedAddress={address}
        connectedDomain={connectedDomain}
      />

      <div className="navFooter">
        <div className="hr" />
        <div className="navFooter_buttons"></div>
      </div>
    </nav>
  );
};
