import { ethers, providers } from "ethers";
import { FC, useRef, useState, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { useAppDispatch } from "state";
import { bonds, urls } from "@klimadao/lib/constants";
import typography from "@klimadao/lib/theme/typography.module.css";
import { useSelector } from "react-redux";
import { selectBalances, selectAppState } from "state/selectors";
import { loadAppDetails } from "actions/app";
import { calcBondDetails } from "actions/bonds";
import { loadAccountDetails } from "actions/user";
import { Stake } from "components/views/Stake";
import { Redeem } from "components/views/Redeem";
import { PKlima } from "components/views/PKlima";
import { Info } from "components/views/Info";
import { Loading } from "components/views/Loading";
import { ChooseBond } from "components/views/ChooseBond";
import { Bond } from "components/views/Bond";
import { Wrap } from "components/views/Wrap";
import { InvalidNetworkModal } from "components/InvalidNetworkModal";
import { InvalidRPCModal } from "components/InvalidRPCModal";
import { CheckURLBanner, skipCheckURLBanner } from "components/CheckURLBanner";
import { generateLinks, LoadWeb3Modal } from "./constants";
import Nav from "./Nav";
import WalletAction from "./WalletAction";
import MobileMenu from "./MobileMenu";
import { NotificationModal } from "components/NotificationModal";

import { Trans } from "@lingui/macro";
import { init } from "lib/i18n";

import styles from "./index.module.css";
import { IS_PRODUCTION } from "lib/constants";
import { setAppState } from "state/app";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

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
            // infuraId: INFURA_ID,
            rpc: { 137: urls.polygonMainnetRpc },
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
  LoadWeb3Modal
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
  const [showCheckURLBanner, setShowCheckURLBanner] = useState(
    !skipCheckURLBanner()
  );

  const [provider, address, web3Modal, loadWeb3Modal] = useProvider();
  const { pathname } = useLocation();
  const [path, setPath] = useState("");
  const balances = useSelector(selectBalances);
  const { locale } = useSelector(selectAppState);

  useEffect(() => {
    if (locale === undefined) {
      init().then((init_locale: string) => {
        dispatch(setAppState({ locale: init_locale }));
      });
    }
  }, []);
  /**
   * This is a hack to force re-render of nav component
   * because SSR hydration doesn't show active path
   */
  useEffect(() => {
    setPath(pathname);
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

  const showPklimaButton = path === "/pklima" || !!Number(balances?.pklima);
  const showRedeemButton =
    path === "/redeem" ||
    !!Number(balances?.aklima) ||
    !!Number(balances?.alklima);

  // render the nav twice-- on both sides of screen-- but the second one is hidden.
  // A hack to keep the card centered in the viewport.

  const links = generateLinks({ path, showPklimaButton, showRedeemButton });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heroBackgroundContainer}>
          <img src="/green-wormhole.jpg" alt="" />
          <div className={styles.heroGradient} />
        </div>
        <div className={styles.heroSection}>
          <header className={styles.header}>
            <div className={styles.header_leftCol}>
              <div className={styles.logoContainer}>
                <a href={urls.home} style={{ justifySelf: "start" }}>
                  <img src="/klima-logo.png" alt="Logo. Go home." />
                </a>
              </div>
              <p className={typography.h6} style={{ maxWidth: "46rem" }}>
                <Trans id="header.welcome">
                  Welcome to the Klima dApp. Bond carbon to buy KLIMA. Stake
                  KLIMA to earn interest.
                </Trans>
              </p>
            </div>
            <MobileMenu
              links={links}
              isConnected={isConnected}
              loadWeb3Modal={loadWeb3Modal}
              disconnect={disconnect}
            />
            <WalletAction
              address={address}
              isConnected={isConnected}
              loadWeb3Modal={loadWeb3Modal}
              disconnect={disconnect}
            />
            {!IS_PRODUCTION && <ChangeLanguageButton />}
          </header>
          <main className={styles.main}>
            <Nav links={links} chainId={chainId} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Loading />
                    {path === "/" && <Navigate to="/stake" />}
                  </>
                }
              />
              <Route
                path="/stake"
                element={
                  <Stake
                    address={address}
                    provider={provider}
                    isConnected={isConnected}
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
                        provider={provider}
                        address={address}
                        bond={bond}
                        isConnected={isConnected}
                      />
                    }
                  />
                );
              })}
            </Routes>
            <div className={styles.invisibleColumn}>
              {<Nav links={links} chainId={chainId} />}
            </div>
          </main>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footer_content}>
            <a href={urls.home} className={styles.footer_logo}>
              <img src="klima-logo.png" alt="" />
            </a>
            <nav className={styles.footer_content_nav}>
              <a href={urls.home}>
                <Trans id="footer.home">home</Trans>
              </a>
              <a href={urls.gitbook}>
                <Trans id="footer.docs">docs</Trans>
              </a>
              <a href={urls.blog}>
                <Trans id="footer.blog">blog</Trans>
              </a>
              <a href={urls.discordInvite}>
                <Trans id="footer.community">community</Trans>
              </a>
            </nav>
          </div>
        </footer>
      </div>
      <InvalidNetworkModal provider={provider} />
      {showRPCModal && (
        <InvalidRPCModal
          onHide={() => {
            setShowRPCModal(false);
          }}
        />
      )}
      {showCheckURLBanner && (
        <CheckURLBanner
          onHide={() => {
            setShowCheckURLBanner(false);
          }}
        />
      )}
      <NotificationModal />
    </>
  );
};
