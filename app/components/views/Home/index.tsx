import { bonds } from "@klimadao/lib/constants";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "state";

import { loadAppDetails } from "actions/app";
import { loadAccountDetails } from "actions/user";
import { useLocaleFromParams } from "lib/hooks/useLocaleFromParams";
import { selectAppState } from "state/selectors";

import { CheckURLBanner, skipCheckURLBanner } from "components/CheckURLBanner";
import { InvalidNetworkModal } from "components/InvalidNetworkModal";
import { InvalidRPCModal } from "components/InvalidRPCModal";
import { NotificationModal } from "components/NotificationModal";
import { Bond } from "components/views/Bond";
import { ChooseBond } from "components/views/ChooseBond";
import { Info } from "components/views/Info";
import { Offset } from "components/views/Offset";
import { PKlima } from "components/views/PKlima";
import { Stake } from "components/views/Stake";
import { Wrap } from "components/views/Wrap";

import { initLocale } from "lib/i18n";

import { ButtonPrimary, ConnectModal } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { IsomorphicRoutes } from "components/IsomorphicRoutes";
import { NavMenu } from "components/NavMenu";
import { setAppState } from "state/app";
import { Buy } from "../Buy";
import * as styles from "./styles";

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

  return (
    <>
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
            <ButtonPrimary
              label={t({
                id: "shared.login_connect",
                message: "Login / Connect",
              })}
              onClick={web3.showConnect}
            />
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
              buttonText={t({
                id: "shared.login_connect",
                message: "Login / Connect",
              })}
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

      <InvalidNetworkModal />
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
