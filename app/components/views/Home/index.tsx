import { FC, useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "state";
import { bonds } from "@klimadao/lib/constants";
import { useSelector } from "react-redux";
import { Global, css } from "@emotion/react";

import { useLocaleFromParams } from "lib/hooks/useLocaleFromParams";
import { selectAppState } from "state/selectors";
import { loadAppDetails } from "actions/app";
import { calcBondDetails } from "actions/bonds";
import { loadAccountDetails } from "actions/user";

import { Stake } from "components/views/Stake";
import { PKlima } from "components/views/PKlima";
import { Info } from "components/views/Info";
import { ChooseBond } from "components/views/ChooseBond";
import { Bond } from "components/views/Bond";
import { Wrap } from "components/views/Wrap";
import { Offset } from "components/views/Offset";
import { InvalidNetworkModal } from "components/InvalidNetworkModal";
import { InvalidRPCModal } from "components/InvalidRPCModal";
import { CheckURLBanner, skipCheckURLBanner } from "components/CheckURLBanner";
import { NotificationModal } from "components/NotificationModal";

import { initLocale } from "lib/i18n";

import * as styles from "./styles";
import { setAppState } from "state/app";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { ConnectButton } from "../../ConnectButton";
import { NavMenu } from "components/NavMenu";
import Menu from "@mui/icons-material/Menu";
import { IsomorphicRoutes } from "components/IsomorphicRoutes";
import { Buy } from "../Buy";
import { useWeb3 } from "@klimadao/lib/components";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const [chainId, setChainId] = useState<number>();
  const [showRPCModal, setShowRPCModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const localeFromURL = useLocaleFromParams();

  const { pathname } = useLocation();
  const [showCheckURLBanner, setShowCheckURLBanner] = useState(
    !skipCheckURLBanner()
  );

  const { locale } = useSelector(selectAppState);

  const web3 = useWeb3();

  useEffect(() => {
    if (locale === undefined) {
      initLocale(localeFromURL).then((init_locale: string) => {
        dispatch(setAppState({ locale: init_locale }));
      });
    }
  }, [localeFromURL]);

  useEffect(() => {
    if (pathname === "/") {
      window.location.replace(`/#/stake${window.location.search}`);
    }
  }, [pathname]);

  const handleRPCError = () => {
    setShowRPCModal(true);
  };

  const loadNetworkInfo = async () => {
    if (web3.network && chainId !== web3.network.chainId) {
      setChainId(web3.network.chainId);
      // if network is invalid, modal will ask for network change -> page will reload
    }
  };

  const loadUserInfo = async () => {
    if (!web3.isConnected) return; // type-guard
    try {
      dispatch(
        loadAccountDetails({
          address: web3.address,
          provider: web3.provider,
          onRPCError: handleRPCError,
        })
      );
    } catch (e) {
      console.error("LOAD USER INFO CAUGHT", e);
    }
  };

  const initApp = async () => {
    dispatch(
      loadAppDetails({
        onRPCError: handleRPCError,
      })
    );
    bonds.forEach((bond) => {
      dispatch(
        calcBondDetails({
          bond,
        })
      );
    });
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (web3.provider) {
      loadNetworkInfo();
    }
  }, [web3.provider]);

  useEffect(() => {
    if (web3.isConnected) {
      loadUserInfo();
    }
  }, [web3.isConnected]);

  /**
   * Outline manager for a11y
   * So we can hide outlines when clicking, only show them when tabbing
   */
  useEffect(() => {
    const handleMousedown = () => {
      document.body.removeEventListener("mousedown", handleMousedown);
      document.body.classList.remove("user-is-tabbing");
      document.body.addEventListener("keydown", handleKeydown);
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.keyCode === 9) {
        document.body.removeEventListener("keydown", handleKeydown);
        document.body.classList.add("user-is-tabbing");
        document.body.addEventListener("mousedown", handleMousedown);
      }
    };
    document.body.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.removeEventListener("keydown", handleKeydown);
      document.body.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  return (
    <>
      <Global
        styles={css`
          .MuiSvgIcon-root {
            font-size: 2.4rem;
            width: 2.4rem;
            height: 2.4rem;
          }
        `}
      />
      <div className={styles.container} data-scrolllock={showMobileMenu}>
        <div className={styles.desktopNavMenu}>
          <NavMenu address={web3.address} />
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
                address={web3.address}
                onHide={() => setShowMobileMenu(false)}
              />
            </div>
            <ChangeLanguageButton />
            <ConnectButton
              isConnected={web3.isConnected}
              loadWeb3Modal={async () => {
                await web3.connect?.();
              }}
              disconnect={async () => {
                await web3.disconnect?.();
              }}
            />
          </div>
          <IsomorphicRoutes>
            <Route
              path="/buy"
              element={
                <Buy
                  address={web3.address}
                  provider={web3.provider}
                  isConnected={web3.isConnected}
                  loadWeb3Modal={async () => {
                    await web3.connect?.();
                  }}
                />
              }
            />
            <Route
              path="/stake"
              element={
                <Stake
                  address={web3.address}
                  provider={web3.provider}
                  isConnected={web3.isConnected}
                  loadWeb3Modal={async () => {
                    await web3.connect?.();
                  }}
                />
              }
            />
            <Route
              path="/pklima"
              element={
                <PKlima
                  address={web3.address}
                  provider={web3.provider}
                  isConnected={web3.isConnected}
                  loadWeb3Modal={async () => {
                    await web3.connect?.();
                  }}
                />
              }
            />
            <Route
              path="/wrap"
              element={
                <Wrap
                  address={web3.address}
                  provider={web3.provider}
                  isConnected={web3.isConnected}
                  loadWeb3Modal={async () => {
                    await web3.connect?.();
                  }}
                />
              }
            />
            <Route
              path="/offset"
              element={
                <Offset
                  address={web3.address}
                  provider={web3.provider}
                  isConnected={web3.isConnected}
                  loadWeb3Modal={async () => {
                    await web3.connect?.();
                  }}
                  onRPCError={handleRPCError}
                />
              }
            />
            <Route path="/info" element={<Info provider={web3.provider} />} />
            <Route path="/bonds" element={<ChooseBond />} />
            {bonds.map((bond) => {
              return (
                <Route
                  key={bond}
                  path={`/bonds/${bond}`}
                  element={
                    <Bond
                      loadWeb3Modal={async () => {
                        await web3.connect?.();
                      }}
                      provider={web3.provider}
                      address={web3.address}
                      bond={bond}
                      isConnected={web3.isConnected}
                    />
                  }
                />
              );
            })}
          </IsomorphicRoutes>
        </div>
      </div>

      <InvalidNetworkModal provider={web3.provider} />
      <NotificationModal />

      {showRPCModal && (
        <InvalidRPCModal onHide={() => setShowRPCModal(false)} />
      )}
      {showCheckURLBanner && (
        <CheckURLBanner onHide={() => setShowCheckURLBanner(false)} />
      )}
    </>
  );
};
