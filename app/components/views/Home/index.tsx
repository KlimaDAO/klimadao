import { FC, useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "state";
import { bonds } from "@klimadao/lib/constants";
import { useSelector } from "react-redux";

import { useLocaleFromParams } from "lib/hooks/useLocaleFromParams";
import { selectAppState } from "state/selectors";
import { loadAppDetails } from "actions/app";
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

import * as styles              from "./styles";
import { setAppState }          from "state/app";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { useWeb3 } from "@klimadao/lib/utils";
import { ConnectButton }        from "../../ConnectButton";
import { NavMenu }              from "components/NavMenu";
import Menu                     from "@mui/icons-material/Menu";
import { IsomorphicRoutes }     from "components/IsomorphicRoutes";
import { Buy }                  from "../Buy";
import { BuyModal }             from '../../BuyModal'

// Taken from https://mui.com/material-ui/material-icons/?query=email&selected=MailOutline
const emailIconDataUri =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-10cscxr' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='MailOutlineIcon'%3E%3Cpath stroke-width='.1' stroke='%23999999' fill='%23999999' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'%3E%3C/path%3E%3C/svg%3E";

type EIP1139Provider = ethers.providers.ExternalProvider & {
  on: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
  remove: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
};

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
        torus: {
          package: Torus,
          options: {
            networkParams: {
              host: "matic", // optional
            },
          },
          display: {
            name: "Email or Social",
            description:
              "Torus provides easy one-click email or social wallets",
            logo: emailIconDataUri,
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
>>>>>>> 5672a16f (WIP: First draft)

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

      <InvalidNetworkModal />
      <NotificationModal />
      <BuyModal address={address} />

      {showRPCModal && (
        <InvalidRPCModal onHide={() => setShowRPCModal(false)} />
      )}
      {showCheckURLBanner && (
        <CheckURLBanner onHide={() => setShowCheckURLBanner(false)} />
      )}
    </>
  );
};
