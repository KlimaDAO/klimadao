import { ConnectModal } from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import { getENSProfile, getKNSProfile, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { Footer } from "components/Footer";
import dynamic from "next/dynamic";
import { FC, ReactNode, useEffect, useState } from "react";
import { NavMenu } from "./NavMenu";

import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  userAddress?: string;
  userDomain?: string | null;
  profileButton?: JSX.Element;
  children: ReactNode;
};

export const MarketplaceLayout: FC<Props> = (props: Props) => {
  const { address } = useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profileData, setProfileData] = useState<Domain>();

  // collect nameserviceDomain Data if connected and domain is in URL
  useEffect(() => {
    if (!props.userDomain || !address) return;

    const setProfile = async () => {
      const kns = await getKNSProfile({
        address: address,
      });

      if (kns) return setProfileData(kns);

      const ens = await getENSProfile({ address: address });
      if (ens) return setProfileData(ens);
    };

    setProfile();
  }, [props.userDomain, address]);

  return (
    <>
      <div className={styles.container} data-scrolllock={showMobileMenu}>
        <div className={styles.desktopNavMenu}>
          <NavMenu
            userAdress={props.userAddress}
            connectedAddress={address}
            connectedDomain={profileData}
          />
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.controls}>
            <button
              onClick={() => setShowMobileMenu((s) => !s)}
              className={styles.menuButton}
            >
              <Menu />
            </button>
            {/* keep mobile nav menu here in markup hierarchy for tab nav */}
            <div
              className={styles.mobileNavMenu_overlay}
              data-visible={showMobileMenu}
              onClick={() => setShowMobileMenu(false)}
            />
            <div className={styles.mobileNavMenu} data-visible={showMobileMenu}>
              <NavMenu
                userAdress={props.userAddress}
                connectedAddress={address}
                connectedDomain={profileData}
                onHide={() => setShowMobileMenu(false)}
              />
            </div>

            <ChangeLanguageButton />
            <ThemeToggle />

            {props.profileButton}

            <ConnectModal
              errorMessage={t({
                message: "We had some trouble connecting. Please try again.",
                id: "connect_modal.error_message",
              })}
              torusText={t({
                message: "or continue with",
                id: "connectModal.continue",
              })}
              titles={{
                connect: t({
                  id: "connect_modal.sign_in",
                  message: "Sign In / Connect",
                }),
                loading: t({
                  id: "connect_modal.connecting",
                  message: "Connecting...",
                }),
                error: t({
                  id: "connect_modal.error_title",
                  message: "Connection Error",
                }),
              }}
              buttonText={t({ id: "shared.connect", message: "Connect" })}
            />
          </div>

          {props.children}

          <Footer className={styles.fullWidthFooter} />
        </div>
      </div>
    </>
  );
};
