import { ButtonPrimary } from "@klimadao/lib/components";
import { bonds } from "@klimadao/lib/constants";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { loadAppDetails } from "actions/app";
import { loadAccountDetails } from "actions/user";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { CheckURLBanner, skipCheckURLBanner } from "components/CheckURLBanner";
import { InvalidNetworkModal } from "components/InvalidNetworkModal";
import { InvalidRPCModal } from "components/InvalidRPCModal";
import { IsomorphicRoutes } from "components/IsomorphicRoutes";
import { NavMenu } from "components/NavMenu";
import { NotificationModal } from "components/NotificationModal";
import { Bond } from "components/views/Bond";
import { Buy } from "components/views/Buy";
import { ChooseBond } from "components/views/ChooseBond";
import { Info } from "components/views/Info";
import { Offset } from "components/views/Offset";
import { PKlima } from "components/views/PKlima";
import { Redeem } from "components/views/Redeem";
import { Stake } from "components/views/Stake";
import { Wrap } from "components/views/Wrap";
import { Custom404 } from "components/views/errors/Custom404";
import { getConnectErrorStrings } from "lib/constants";
import { useLocaleFromParams } from "lib/hooks/useLocaleFromParams";
import { initLocale } from "lib/i18n";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "state";
import { setAppState } from "state/app";
import { selectAppState } from "state/selectors";
import { Deposit } from "../Deposit";
import * as styles from "./styles";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const [chainId, setChainId] = useState<number>();
  const [showRPCModal, setShowRPCModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const localeFromURL = useLocaleFromParams();

  const { pathname } = useLocation();
  const [showCheckURLBanner, setShowCheckURLBanner] = useState(false);

  const { locale } = useSelector(selectAppState);

  const {
    address,
    isConnected,
    disconnect,
    toggleModal,
    network,
    provider,
    renderModal,
  } = useWeb3();

  useEffect(() => {
    if (locale === undefined) {
      initLocale(localeFromURL).then((init_locale: string) => {
        dispatch(setAppState({ locale: init_locale }));
      });
    }
  }, [localeFromURL]);

  useEffect(() => {
    setShowCheckURLBanner(!skipCheckURLBanner());
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      window.location.replace(`/#/stake${window.location.search}`);
    }
  }, [pathname]);

  const handleRPCError = () => {
    setShowRPCModal(true);
  };

  const loadNetworkInfo = async () => {
    if (network && chainId !== network.chainId) {
      setChainId(network.chainId);
      // if network is invalid, modal will ask for network change -> page will reload
    }
  };

  const loadUserInfo = async () => {
    if (!isConnected) return; // type-guard
    try {
      dispatch(
        loadAccountDetails({
          address: address,
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
    if (provider) {
      loadNetworkInfo();
    }
  }, [provider]);

  useEffect(() => {
    if (isConnected) {
      loadUserInfo();
    }
  }, [isConnected]);

  return (
    <>
      <div className={styles.container} data-scroll-lock={showMobileMenu}>
        <div className={styles.desktopNavMenu}>
          <NavMenu address={address} />
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
                onHide={() => setShowMobileMenu(false)}
              />
            </div>
            <ChangeLanguageButton />
            {!address && !isConnected && (
              <ButtonPrimary
                label={t({
                  id: "shared.login_connect",
                  message: "Login / Connect",
                })}
                onClick={toggleModal}
              />
            )}
            {address && isConnected && (
              <ButtonPrimary
                label={concatAddress(address)}
                onClick={disconnect}
              />
            )}
            {renderModal({
              errors: getConnectErrorStrings(),
              torusText: t({
                message: "social or email",
                id: "connectModal.torus",
              }),
              walletText: t({
                message: "connect a wallet",
                id: "connectModal.wallet",
              }),
              titles: {
                connect: t`Login`,
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
          <IsomorphicRoutes>
            <Route
              path="/buy"
              element={
                <Buy
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                />
              }
            />
            <Route
              path="/stake"
              element={
                <Stake
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                  toggleModal={toggleModal}
                />
              }
            />
            <Route
              path="/pklima"
              element={
                <PKlima
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                  toggleModal={toggleModal}
                />
              }
            />
            <Route
              path="/wrap"
              element={
                <Wrap
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                  toggleModal={toggleModal}
                />
              }
            />
            <Route
              path="/offset"
              element={<Offset isConnected={isConnected} />}
            />
            <Route
              path="/deposit"
              element={
                <Deposit
                  isConnected={isConnected}
                  address={address}
                  provider={provider}
                />
              }
            />
            <Route
              path="/redeem"
              element={
                <Redeem
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                  onRPCError={handleRPCError}
                  toggleModal={toggleModal}
                />
              }
            />
            <Route path="/info" element={<Info provider={provider} />} />
            <Route path="/bonds" element={<ChooseBond />} />
            {bonds.map((bond) => {
              return (
                <Route
                  key={bond}
                  path={`/bonds/${bond}`}
                  element={
                    <Bond
                      provider={provider}
                      address={address}
                      bond={bond}
                      isConnected={isConnected}
                      toggleModal={toggleModal}
                    />
                  }
                />
              );
            })}
            <Route path="*" element={<Custom404 />} />
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
