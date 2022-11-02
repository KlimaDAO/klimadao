import dynamic from "next/dynamic";
import { FC, useState, useEffect } from "react";
import { useWeb3, getENSProfile, getKNSProfile } from "@klimadao/lib/utils";
import { ButtonPrimary } from "@klimadao/lib/components";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { Footer } from "components/Footer";
import { NavMenu } from "./NavMenu";
import Menu from "@mui/icons-material/Menu";
import { t } from "@lingui/macro";
import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
import { Domain } from "@klimadao/lib/types/domains";

import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  userDomain?: string | null;
  profileButton?: JSX.Element;
};

export const MarketplaceLayout: FC<Props> = (props) => {
  const { address, connect, disconnect, isConnected } = useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profileData, setProfileData] = useState<Domain>();

  // collect nameserviceDomain Data if connected and domain is in URL
  useEffect(() => {
    if (!props.userDomain || !address) return;

    const setProfile = async () => {
      const kns = await getKNSProfile({
        address: address,
        providerUrl: getInfuraUrlPolygon(),
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
          <NavMenu connectedAddress={address} connectedDomain={profileData} />
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
                connectedAddress={address}
                connectedDomain={profileData}
                onHide={() => setShowMobileMenu(false)}
              />
            </div>

            <ChangeLanguageButton />
            <ThemeToggle />

            {props.profileButton}

            {isConnected && address ? (
              <ButtonPrimary
                label={t({ id: "shared.disconnect", message: "Disconnect" })}
                onClick={disconnect}
              />
            ) : (
              <ButtonPrimary
                label={t({ id: "shared.connect", message: "Connect" })}
                onClick={connect}
              />
            )}
          </div>

          {props.children}

          <Footer className={styles.fullWidthFooter} />
        </div>
      </div>
    </>
  );
};
