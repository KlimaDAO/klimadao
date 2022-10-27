import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { useWeb3 } from "@klimadao/lib/utils";
import { ButtonPrimary } from "@klimadao/lib/components";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { Footer } from "components/Footer";
import { NavMenu } from "./NavMenu";
import Menu from "@mui/icons-material/Menu";
import { t } from "@lingui/macro";

import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  user?: string;
};

export const MarketplaceLayout: FC<Props> = (props) => {
  const { address, connect, disconnect, isConnected } = useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <div className={styles.container} data-scrolllock={showMobileMenu}>
        <div className={styles.desktopNavMenu}>
          <NavMenu address={address} user={props.user} />
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
                address={address}
                user={props.user}
                onHide={() => setShowMobileMenu(false)}
              />
            </div>

            <ChangeLanguageButton />
            <ThemeToggle />

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
