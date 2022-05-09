import { ethers, providers } from "ethers";
import { FC, useRef, useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useAppDispatch } from "state";
import { bonds, urls } from "@klimadao/lib/constants";
import { useSelector } from "react-redux";

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
import dynamic from "next/dynamic";

import { initLocale } from "lib/i18n";

import styles from "./index.module.css";
import { setAppState } from "state/app";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { ConnectButton } from "../../ConnectButton";
import { NavMenu } from "components/NavMenu";
import Menu from "@mui/icons-material/Menu";
import { IsomorphicRoutes } from "components/IsomorphicRoutes";
import { Buy } from "../Buy";

type EIP1139Provider = ethers.providers.ExternalProvider & {
  on: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
  remove: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
};

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

/** wrap in useEffect to skip on server-side render */
const useWeb3Modal = () => {
  const ref = useRef<Web3Modal>();
  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            rpc: { 137: urls.polygonMainnetRpc },
          },
        },
        walletlink: {
          package: WalletLink,
          options: {
            appName: "Official KlimaDAO App",
            rpc: urls.polygonMainnetRpc,
            chainId: 137, // Optional. It defaults to 1 if not provided
            appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
            darkMode: false, // Optional. Use dark theme, defaults to false
          },
        },
      },
    });
    ref.current = modal;
  }, []);
  return ref.current;
};

const useProvider = (): [
  ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  string | undefined,
  Web3Modal | undefined,
  () => Promise<void>
] => {
  const fallbackProvider = useRef<ethers.providers.JsonRpcProvider>();
  const web3Modal = useWeb3Modal();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>();

  const loadWeb3Modal = async () => {
    try {
      const modalProvider = await web3Modal?.connect();
      if (modalProvider) {
        const provider = new ethers.providers.Web3Provider(modalProvider);
        const address = await provider.getSigner().getAddress();
        setProvider(provider);
        setAddress(address);
      }
    } catch (e) {
      // handle bug where old cached providers cause the modal to keep reappearing
      web3Modal?.clearCachedProvider();
    }
  };

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      loadWeb3Modal();
    }
  }, [web3Modal]);

  useEffect(() => {
    const handleChainChanged = () => {
      window.location.reload();
    };
    const handleAccountsChanged = () => {
      window.location.reload();
    };
    if (provider && provider.provider) {
      const typedProvider = provider.provider as EIP1139Provider;
      // EIP-1193 Providers (metamask) have these methods
      typedProvider.on("chainChanged", handleChainChanged);
      typedProvider.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      const typedProvider = provider?.provider as EIP1139Provider;
      if (typedProvider && typedProvider.remove) {
        typedProvider.remove("accountsChanged", handleAccountsChanged);
        typedProvider.remove("chainChanged", handleChainChanged);
      }
    };
  }, [provider]);

  if (!provider && !fallbackProvider.current) {
    fallbackProvider.current = new ethers.providers.JsonRpcProvider(
      urls.polygonMainnetRpc
    );
    return [fallbackProvider.current, "", web3Modal, loadWeb3Modal];
  }
  return [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provider || fallbackProvider.current!,
    address,
    web3Modal,
    loadWeb3Modal,
  ];
};

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
  const [provider, address, web3Modal, loadWeb3Modal] = useProvider();
  const { locale } = useSelector(selectAppState);

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
    const networkInfo = await provider.getNetwork();
    if (chainId !== networkInfo.chainId) {
      setChainId(networkInfo.chainId);
      // if network is invalid, modal will ask for network change -> page will reload
    }
  };

  const loadUserInfo = async (addr: string) => {
    try {
      dispatch(
        loadAccountDetails({
          address: addr,
          provider,
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
        provider,
        onRPCError: handleRPCError,
      })
    );
    bonds.forEach((bond) => {
      dispatch(
        calcBondDetails({
          bond,
          provider,
        })
      );
    });
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
    if (address) {
      loadUserInfo(address);
    }
  }, [address]);

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

  const disconnect = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const untypedProvider = provider as any;
    if (
      untypedProvider &&
      untypedProvider.provider &&
      typeof untypedProvider.provider.disconnect === "function"
    ) {
      await untypedProvider.provider.disconnect();
    }
    if (untypedProvider && typeof untypedProvider.disconnect === "function") {
      await untypedProvider.disconnect();
    }
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  const isConnected = !!address;

  return (
    <>
      <div className={styles.container} data-scrolllock={showMobileMenu}>
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
            <ThemeToggle />
            <ChangeLanguageButton />
            <ConnectButton
              isConnected={isConnected}
              loadWeb3Modal={loadWeb3Modal}
              disconnect={disconnect}
            />
          </div>
          <IsomorphicRoutes>
            <Route
              path="/buy"
              element={
                <Buy
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                  loadWeb3Modal={loadWeb3Modal}
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
                  loadWeb3Modal={loadWeb3Modal}
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
                  loadWeb3Modal={loadWeb3Modal}
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
                  loadWeb3Modal={loadWeb3Modal}
                />
              }
            />
            <Route
              path="/offset"
              element={
                <Offset
                  address={address}
                  provider={provider}
                  isConnected={isConnected}
                  loadWeb3Modal={loadWeb3Modal}
                  onRPCError={handleRPCError}
                />
              }
            />
            <Route
              path="/info"
              element={<Info provider={provider as providers.Web3Provider} />}
            />
            <Route path="/bonds" element={<ChooseBond />} />
            {bonds.map((bond) => {
              return (
                <Route
                  key={bond}
                  path={`/bonds/${bond}`}
                  element={
                    <Bond
                      loadWeb3Modal={loadWeb3Modal}
                      provider={provider}
                      address={address}
                      bond={bond}
                      isConnected={isConnected}
                    />
                  }
                />
              );
            })}
          </IsomorphicRoutes>
        </div>
      </div>

      <InvalidNetworkModal provider={provider} />
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
