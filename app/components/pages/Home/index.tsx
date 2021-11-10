import { ethers } from "ethers";
import { FC, useRef, useState, useEffect } from "react";
import {
  Navigate,
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { WithRedux } from "components/WithRedux";
import { useAppDispatch } from "state";
import { bonds, urls } from "@klimadao/lib/constants";
import { useSelector } from "react-redux";
import { selectPklima } from "state/selectors";
import { loadAppDetails } from "actions/app";
import { calcBondDetails } from "actions/bonds";
import { loadAccountDetails } from "actions/user";

import styles from "./index.module.css";

type EIP1139Provider = ethers.providers.ExternalProvider & {
  on: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
  remove: (e: "accountsChanged" | "chainChanged", cb: () => void) => void;
};

const web3Modal = new Web3Modal({
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

type LoadWeb3Modal = () => Promise<void>;
const useProvider = (): [
  ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
  string | undefined,
  LoadWeb3Modal
] => {
  const fallbackProvider = useRef<ethers.providers.JsonRpcProvider>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [address, setAddress] = useState<string>();

  const loadWeb3Modal = async () => {
    try {
      const modalProvider = await web3Modal.connect();
      if (modalProvider) {
        const provider = new ethers.providers.Web3Provider(modalProvider);
        const address = await provider.getSigner().getAddress();
        setProvider(provider);
        setAddress(address);
      }
    } catch (e) {
      // handle bug where old cached providers cause the modal to keep reappearing
      web3Modal.clearCachedProvider();
    }
  };
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, []);

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
      if (provider && provider.provider) {
        const typedProvider = provider.provider as EIP1139Provider;
        typedProvider.remove("accountsChanged", handleAccountsChanged);
        typedProvider.remove("chainChanged", handleChainChanged);
      }
    };
  }, [provider]);

  if (!provider && !fallbackProvider.current) {
    fallbackProvider.current = new ethers.providers.JsonRpcProvider(
      urls.polygonMainnetRpc
    );
    return [fallbackProvider.current, "", loadWeb3Modal];
  }
  return [provider || fallbackProvider.current!, address, loadWeb3Modal];
};

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const [chainId, setChainId] = useState<number>();
  const [showRPCModal, setShowRPCModal] = useState(false);
  const [provider, address, loadWeb3Modal] = useProvider();
  const { pathname } = useLocation();

  const pKlimaBalance = useSelector(selectPklima);

  const handleRPCError = () => {
    setShowRPCModal(true);
  };

  const loadNetworkInfo = async () => {
    const networkInfo = await provider.getNetwork();
    setChainId(networkInfo.chainId);
    if (networkInfo.chainId !== 137 && networkInfo.chainId !== 80001) {
      return; // modal will ask for network change -> page will reload
    }

    dispatch(
      loadAppDetails({
        provider,
        onRPCError: handleRPCError,
      })
    );
    dispatch(
      calcBondDetails({
        bond: "klima_bct_lp",
        value: "",
        provider,
      })
    );
    dispatch(
      calcBondDetails({
        bond: "bct_usdc_lp",
        value: "",
        provider,
      })
    );
    dispatch(
      calcBondDetails({
        bond: "bct",
        value: "",
        provider,
      })
    );
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
      console.log("LOAD NETWORK CAUGHT", e);
    }
  };

  useEffect(() => {
    if (provider) {
      loadNetworkInfo();
    }
    if (address) {
      loadUserInfo(address);
    }
  }, [provider, address]);

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
  // render the nav twice-- on both sides of screen-- but the second one is hidden.
  // A hack to keep the card centered in the viewport.
  const nav = (
    <nav className={styles.nav}>
      {chainId === 80001 && (
        <p className={styles.testnet_warning}>
          ⚠️You are connected to <strong>testnet</strong>
          <br />
          <em>"where everything is made up and the points don't matter."</em>
        </p>
      )}
      {!isConnected && (
        <button
          type="button"
          className={styles.connectWalletButton}
          onClick={loadWeb3Modal}
        >
          CONNECT WALLET
        </button>
      )}
      {isConnected && (
        <button
          type="button"
          className={styles.disconnectWalletButton}
          onClick={disconnect}
        >
          DISCONNECT WALLET
        </button>
      )}
      <Link
        className={styles.textButton}
        to="/redeem"
        data-active={pathname === "/redeem"}
      >
        REDEEM aKLIMA
      </Link>
      <Link
        className={styles.textButton}
        to="/bonds"
        data-active={pathname.includes("/bonds")}
      >
        BOND CARBON
      </Link>
      <Link
        className={styles.textButton}
        to="/stake"
        data-active={pathname === "/stake"}
      >
        STAKE KLIMA
      </Link>
      <Link
        className={styles.textButton}
        to="/info"
        data-active={pathname === "/info"}
      >
        INFO & FAQ
      </Link>
      {pKlimaBalance && Number(pKlimaBalance) > 0 && (
        <Link
          className={styles.textButton}
          to="/pklima"
          data-active={pathname === "/pklima"}
        >
          pKLIMA
        </Link>
      )}
    </nav>
  );

  return (
    <WithRedux>
      <div className={styles.app}>
        <div className={styles.app_bgGradient} />
        <header className={styles.header}>
          <a href="https://klimadao.finance" style={{ justifySelf: "start" }}>
            <img
              className={styles.logo}
              src="/klima-logo.jpg"
              alt=""
              role="presentation"
            />
          </a>
          <p className={styles.header_subtitle}>
            Welcome to the Klima dApp. Bond carbon to buy KLIMA. Stake KLIMA to
            earn interest.
          </p>
        </header>
        <main className={styles.main}>
          {nav}
          <Routes>
            <Route path="/">
              <Navigate to="/stake" />
            </Route>
            <Route path="/stake">
              <Stake
                address={address}
                provider={provider}
                isConnected={isConnected}
              />
            </Route>
            <Route path="/redeem">
              <Redeem
                address={address}
                provider={provider}
                isConnected={isConnected}
              />
            </Route>
            <Route path="/pklima">
              <PKlima
                address={address}
                provider={provider}
                isConnected={isConnected}
              />
            </Route>
            <Route path="/bonds">
              <ChooseBond
                address={address}
                provider={provider}
                isConnected={isConnected}
              />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            {bonds.map((bond) => {
              return (
                <Route key={bond} path={`/bonds/${bond}`}>
                  <Bond
                    provider={provider}
                    address={address}
                    bond={bond}
                    isConnected={isConnected}
                  />
                </Route>
              );
            })}
            <Navigate to="/" />
          </Routes>
          <div className={styles.invisibleColumn}>{nav}</div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footer_content}>
            <img className={styles.footer_logo} src="/klima-logo.png" alt="" />
            <nav className={styles.footer_content_nav}>
              <a href="https://klimadao.finance/">home</a>
              <a href={urls.gitbook}>docs</a>
              <a href={urls.blog}>blog</a>
              <a href={urls.emailSignUp}>newsletter</a>
              <a href={urls.discordInvite}>community</a>
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
    </WithRedux>
  );
};
