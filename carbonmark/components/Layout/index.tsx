import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { CarbonmarkLogo } from "components/Logos/CarbonmarkLogo";
import { ProjectsController } from "components/pages/Project/ProjectsController";
import { InvalidNetworkModal } from "components/shared/InvalidNetworkModal";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { useResponsive } from "hooks/useResponsive";
import { connectErrorStrings } from "lib/constants";
import Link from "next/link";
import { useRouter } from "next/router";
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
  profileButton?: JSX.Element;
  /** if true then body of layout will not be constraied by max-width */
  fullWidth?: boolean;
  children: ReactNode;
};

export const Layout: FC<Props> = (props: Props) => {
  const { address, renderModal, isConnected, toggleModal, disconnect } =
    useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isDesktop, isMobile } = useResponsive();
  /**
   * Only show the projects controller if on the Projects Page
   * @todo lift this logic to projects/index.tsx and pass the child components as props to Layout
   */
  const isProjects = useRouter().pathname === "/projects";
  const { fullWidth } = props;
  return (
    <div
      className={cx(styles.container, styles.global)}
      data-scroll-lock={showMobileMenu}
    >
      <div className={styles.desktopNavMenu}>
        <NavDrawer userAddress={props.userAddress} />
      </div>
      <div className={styles.fullWidthScrollableContainer}>
        <div className={cx(styles.cardGrid, { fullWidth })}>
          {/* header  */}
          <div className={styles.controls}>
            <Link href="/" className={styles.mobileLogo} data-mobile-only>
              <CarbonmarkLogo />
            </Link>
            <div className={styles.betaWrapperMobile}>
              <TextInfoTooltip
                contentText={t({
                  message:
                    "This product is still in Beta and hasn't been internally audited yet.",
                })}
                tooltipText={t({ message: "BETA" })}
              />
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

            {/* <ChangeLanguageButton /> */}
            {/* {isDesktop && <ThemeToggle />} */}
            {/* Desktop controller */}
            {isProjects && isDesktop && (
              <ProjectsController className={styles.projectsController} />
            )}

            {props.profileButton}

            <ButtonPrimary
              data-mobile-only
              variant="gray"
              icon={<Menu />}
              onClick={() => setShowMobileMenu((s) => !s)}
              className={styles.menuButton}
            />

            <div data-desktop-only>
              {!address && !isConnected && (
                <ButtonPrimary
                  label={t`Log in`}
                  onClick={toggleModal}
                  className="connectButton"
                />
              )}
              {address && isConnected && (
                <ButtonPrimary
                  label={t`Log out`}
                  onClick={disconnect}
                  className="connectButton"
                />
              )}
            </div>

            {renderModal &&
              renderModal({
                errors: connectErrorStrings,
                torusText: t({
                  message: "or continue with",
                  id: "connectModal.continue",
                }),
                titles: {
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
                },
              })}
            <InvalidNetworkModal />
          </div>
          {/* body  */}
          <div
            style={{
              gridColumn: "1/3",
              display: "inherit",
              gridGap: "inherit",
            }}
          >
            {isProjects && isMobile && (
              <ProjectsController className={styles.mobileProjectsController} />
            )}

            {props.children}
          </div>
          {/* footer  */}
          <Footer className={styles.fullWidthFooter} />
        </div>
      </div>
    </div>
  );
};
