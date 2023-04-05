import { cx } from "@emotion/css";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { BetaBadge } from "components/BetaBadge";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkLogo } from "components/Logos/CarbonmarkLogo";
import { InvalidNetworkModal } from "components/shared/InvalidNetworkModal";
import { connectErrorStrings } from "lib/constants";
import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import "tippy.js/dist/tippy.css";
import { Footer } from "../Footer";
import { NavDrawer } from "./NavDrawer";
import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// const ThemeToggle = dynamic(() => import("../shared/ThemeToggle"), {
//   ssr: false,
// });

type Props = {
  userAddress?: string;
  children: ReactNode;
};

/** App layout for desktop side-panel and mobile navigation */
export const Layout: FC<Props> = (props: Props) => {
  const { renderModal } = useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div
      className={cx(styles.container, styles.global)}
      data-scroll-lock={showMobileMenu}
    >
      <div className={styles.desktopNavMenu}>
        <NavDrawer userAddress={props.userAddress} />
      </div>
      <main className={styles.mainContentGrid}>
        <div className={styles.controls}>
          <Link href="/" className={styles.mobileLogo} data-mobile-only>
            <CarbonmarkLogo />
          </Link>
          <div className={styles.betaWrapperMobile}>
            <BetaBadge />
          </div>
          {/* keep mobile nav menu here in markup hierarchy for tab nav */}
          <div
            className={styles.mobileNavMenu_overlay}
            data-visible={showMobileMenu}
            onClick={() => setShowMobileMenu(false)}
          />
          <div className={styles.mobileNavMenu} data-visible={showMobileMenu}>
            <NavDrawer
              userAddress={props.userAddress}
              onHide={() => setShowMobileMenu(false)}
            />
          </div>
          <ButtonPrimary
            data-mobile-only
            variant="gray"
            icon={<Menu />}
            onClick={() => setShowMobileMenu((s) => !s)}
            className={styles.menuButton}
          />
        </div>
        <div className={styles.layoutChildrenContainer}>{props.children}</div>
        <Footer />
      </main>
      <InvalidNetworkModal />
      {renderModal &&
        renderModal({
          errors: connectErrorStrings,
          torusText: t({
            message: "social or email",
            id: "connectModal.torus",
          }),
          walletText: t({
            message: "connect a wallet",
            id: "connectModal.wallet",
          }),
          institutionalText: t({
            message: "institutional",
            id: "connectModal.institutional",
          }),
          titles: {
            connect: t({
              id: "shared.login",
              message: "Login",
            }),
            loading: t({
              id: "connect_modal.connecting",
              message: "Connecting...",
            }),
            error: t({
              id: "connect_modal.error_title",
              message: "Connection Error",
            }),
          },
        })}
    </div>
  );
};
