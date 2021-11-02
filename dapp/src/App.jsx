import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import React, { useEffect, useState, useRef } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Web3Modal from "web3modal";
import { useDispatch, useSelector } from "react-redux";
import { calcBondDetails } from "./actions/Bond.actions";

import { loadAppDetails, getMarketPrice, getTokenSupply } from "./actions/App.actions";
import { loadAccountDetails } from "./actions/Account.actions";

import { Stake, ChooseBond, Bond, Redeem, PKlima, Info } from "./views";
import { InvalidNetworkModal } from "./components/InvalidNetworkModal";

import { BONDS, addresses, MAINNET_RPC_URL } from "./constants";

import styles from "./App.module.css";
import Logo from "./assets/KlimaDAO/klima-logo.png";
import { InvalidRPCModal } from "./components/InvalidRPCModal";

const LAUNCH_TIMESTAMP = 1634587200000; // milliseconds - October 18th, 1pm pst - 8pm gmt

export const externalHrefs = {
  blog: "https://klimadao.medium.com/",
  emailSignUp: "https://docs.google.com/forms/d/e/1FAIpQLSeJ4-dPoSBS50kT1hSBzQGiA8lMnL5DYKjptQoMBKmgFokJmg/viewform",
  discordInvite: "https://discord.gg/kx4pahaFw8",
  gitbook: "https://klima-dao.gitbook.io/klima-dao/",
  app: "https://dapp.klimadao.finance",
};

const KLIMA_TESTNET = false;
let networkIDtoUse;
if (KLIMA_TESTNET) {
  networkIDtoUse = 80001;
} else {
  networkIDtoUse = 137;
}
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        // infuraId: INFURA_ID,
        rpc: { 137: MAINNET_RPC_URL },
      },
    },
  },
});

const useProvider = () => {
  const fallbackProvider = useRef();
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();

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
    if (provider) {
      provider.provider.on("chainChanged", handleChainChanged);
      provider.provider.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      provider && provider.provider.remove("accountsChanged", handleAccountsChanged);
      provider && provider.provider.remove("chainChanged", handleChainChanged);
    };
  }, [provider]);

  if (!provider && !fallbackProvider.current) {
    fallbackProvider.current = new ethers.providers.JsonRpcProvider(MAINNET_RPC_URL);
    fallbackProvider.current.isFallback = true;
    return [fallbackProvider.current, "", loadWeb3Modal];
  }
  return [provider || fallbackProvider.current, address, loadWeb3Modal];
};

function App() {
  const dispatch = useDispatch();
  const [chainId, setChainId] = useState();
  const [showRPCModal, setShowRPCModal] = useState(false);
  const [provider, address, loadWeb3Modal] = useProvider();
  const { pathname } = useLocation();

  const pKlimaBalance = useSelector(state => {
    return state.app.balances && state.app.balances.pKLIMA;
  });

  const handleRPCError = () => {
    setShowRPCModal(true);
  };

  const loadNetworkInfo = async () => {
    const networkInfo = await provider.getNetwork();
    setChainId(networkInfo.chainId);
    if (networkInfo.chainId !== 137 && networkInfo.chainId !== 80001) {
      return; // modal will ask for network change -> page will reload
    }

    dispatch(loadAppDetails({ networkID: networkInfo.chainId, provider, onRPCError: handleRPCError }));
    dispatch(getMarketPrice({ networkID: networkInfo.chainId, provider }));
    dispatch(getTokenSupply({ networkID: networkInfo.chainId, provider }));
    ["klima_bct_lp", "bct_usdc_lp", "bct"].map(async bond => {
      // CHECK FOR DEPLOYED ADDRESSES
      if (addresses[networkInfo.chainId].BONDS.OHM_DAI !== "") {
        dispatch(calcBondDetails({ bond, value: null, provider, networkID: networkInfo.chainId }));
      }
    });
  };

  const loadUserInfo = async () => {
    try {
      const networkInfo = await provider.getNetwork();
      dispatch(loadAccountDetails({ networkID: networkInfo.chainId, address, provider, onRPCError: handleRPCError }));
    } catch (e) {
      console.log("LOAD NETWORK CAUGHT", e);
    }
  };

  useEffect(() => {
    if (provider) {
      loadNetworkInfo();
    }
    if (address) {
      loadUserInfo();
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
    const handleKeydown = e => {
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
    if (provider && typeof provider.provider.disconnect === "function") {
      await provider.provider.disconnect();
    }
    if (provider && typeof provider.disconnect === "function") {
      provider.disconnect();
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
        <button type="button" className={styles.connectWalletButton} onClick={loadWeb3Modal}>
          CONNECT WALLET
        </button>
      )}
      {isConnected && (
        <button type="button" className={styles.disconnectWalletButton} onClick={disconnect}>
          DISCONNECT WALLET
        </button>
      )}
      <Link className={styles.textButton} to="/redeem" data-active={pathname === "/redeem"}>
        REDEEM aKLIMA
      </Link>
      <Link className={styles.textButton} to="/bonds" data-active={pathname.includes("/bonds")}>
        BOND CARBON
      </Link>
      <Link className={styles.textButton} to="/stake" data-active={pathname === "/stake"}>
        STAKE KLIMA
      </Link>
      <Link className={styles.textButton} to="/info" data-active={pathname === "/info"}>
        INFO & FAQ
      </Link>
      {pKlimaBalance && pKlimaBalance > 0 && (
        <Link className={styles.textButton} to="/pklima" data-active={pathname === "/pklima"}>
          pKLIMA
        </Link>
      )}
    </nav>
  );

  return (
    <>
      <div className={styles.app}>
        <div className={styles.app_bgGradient} />
        <header className={styles.header}>
          <a href="https://klimadao.finance" style={{ justifySelf: "start" }}>
            <img className={styles.logo} src={Logo} alt="" role="presentation" />
          </a>
          <p className={styles.header_subtitle}>
            Welcome to the Klima dApp. Bond carbon to buy KLIMA. Stake KLIMA to earn interest.
          </p>
          {Date.now() < LAUNCH_TIMESTAMP && (
            <p className={styles.prelaunch}>
              🚀 WE'RE LAUNCHING SOON! This dApp is not functional until Monday, October 18th. In the meantime, see our{" "}
              <a href="https://klimadao.medium.com/klimadao-launch-announcement-2f570bc1b0d2">launch announcement</a>{" "}
              for some steps you can take to prepare.
            </p>
          )}
        </header>
        <main className={styles.main}>
          {nav}
          <Switch>
            <Route exact path="/">
              <Redirect to="/stake" />
            </Route>
            <Route exact path="/stake">
              <Stake address={address} provider={provider} isConnected={isConnected} />
            </Route>
            <Route exact path="/redeem">
              <Redeem address={address} provider={provider} isConnected={isConnected} />
            </Route>
            <Route exact path="/pklima">
              <PKlima address={address} provider={provider} isConnected={isConnected} />
            </Route>
            <Route exact path="/bonds">
              <ChooseBond address={address} provider={provider} isConnected={isConnected} />
            </Route>
            <Route exact path="/info">
              <Info />
            </Route>
            {Object.values(BONDS).map(bond => {
              return (
                <Route exact key={bond} path={`/bonds/${bond}`}>
                  <Bond provider={provider} address={address} bond={bond} isConnected={isConnected} />
                </Route>
              );
            })}
            <Redirect to="/" />
          </Switch>
          <div className={styles.invisibleColumn}>{nav}</div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footer_content}>
            <img className={styles.footer_logo} src={Logo} alt="" />
            <nav className={styles.footer_content_nav}>
              <a href="https://klimadao.finance/">home</a>
              <a href={externalHrefs.gitbook}>docs</a>
              <a href={externalHrefs.blog}>blog</a>
              <a href={externalHrefs.emailSignUp}>newsletter</a>
              <a href={externalHrefs.discordInvite}>community</a>
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
    </>
  );
}

export default App;
