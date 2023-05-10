import { Anchor } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import Close from "@mui/icons-material/Close";
import { BetaBadge } from "components/BetaBadge";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { CarbonmarkLogoFull } from "components/Logos/CarbonmarkLogoFull";
import { Text } from "components/Text";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import Link from "next/link";
import { FC } from "react";
import { AddressSection } from "../AddressSection";
import { NavMenu } from "../NavMenu";
import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// const DynamicThemeToggle = dynamic(
//   () => import("components/shared/ThemeToggle"),
//   { ssr: false }
// )

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
      <div className={styles.mobile.header} data-mobile-only>
        <ButtonPrimary
          className="close"
          label={<Close />}
          onClick={props.onHide}
        />
      </div>
      <div className={styles.logo}>
        <Link href="/">
          <CarbonmarkLogoFull />
        </Link>
      </div>

      {!address && !isConnected && (
        <div data-mobile-only>
          <ButtonPrimary
            label={t`Log in`}
            onClick={toggleModal}
            className="connectButton"
          />
          <div className="hr" />
        </div>
      )}
      {address && isConnected && (
        <div data-mobile-only>
          <ButtonPrimary
            label={t`Log out`}
            onClick={disconnect}
            className="connectButton"
          />
        </div>
      )}
      <div className={styles.addressContainer}>
        <div className={styles.betaWrapperDesktop}>
          <BetaBadge />
        </div>
        <div className="hr" />
        <AddressSection domain={connectedDomain} address={address} />
        <div className="hr" />
      </div>
      <NavMenu
        userAddress={props.userAddress}
        connectedAddress={address}
        connectedDomain={connectedDomain}
      />
      <CarbonmarkButton
        label={t`Book a demo`}
        href={urls.carbonmarkContactForm}
        className={styles.bookDemoButton}
        renderLink={(linkProps) => <Anchor {...linkProps} />}
      />
      <div className="navFooter">
        <div className="hr" />
        <Text t="body1" align="center">
          <Trans>
            Built with 🌳 by <a href="https://klimadao.finance">KlimaDAO</a>
          </Trans>
        </Text>
      </div>
    </nav>
  );
};
