/* eslint-disable no-use-before-define */
import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import React, { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Web3Modal from "web3modal";
import { useDispatch } from "react-redux";
import { calcBondDetails } from "./actions/Bond.actions";

import { loadAppDetails, getMarketPrice, getTokenSupply } from "./actions/App.actions";
import { loadAccountDetails } from "./actions/Account.actions";

import { Stake, ChooseBond, Bond, Redeem, PKlima } from "./views";
import { InvalidNetworkModal } from "./components/InvalidNetworkModal";

import { NETWORKS, BONDS, addresses, polygonNetworks, MAINNET_RPC_URL } from "./constants";
import { useUserProvider } from "./hooks";

import styles from "./App.module.css";
import Logo from "./assets/KlimaDAO/klima-logo.png";

const LAUNCH_TIMESTAMP = 1634587200000; // milliseconds - October 18th, 1pm pst - 8pm gmt

export const externalHrefs = {
  blog: "https://klimadao.medium.com/",
  emailSignUp: "https://docs.google.com/forms/d/e/1FAIpQLSeJ4-dPoSBS50kT1hSBzQGiA8lMnL5DYKjptQoMBKmgFokJmg/viewform",
  discordInvite: "https://discord.gg/kx4pahaFw8",
  gitbook: "https://klima-dao.gitbook.io/klima-dao/",
  app: "https://dapp.klimadao.finance",
};

// import Hints from "./Hints";
// import { ExampleUI, Hints, Subgraph } from "./views";
/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/austintgriffith/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.mumbai; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;

const KLIMA_TESTNET = false;
let networkIDtoUse;
if (KLIMA_TESTNET) {
  networkIDtoUse = 80001;
} else {
  networkIDtoUse = 137;
}
// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
// const scaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");

// static fallback
const fallbackProvider = new StaticJsonRpcProvider(polygonNetworks.mainnet.rpcUrls[0]);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
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

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

function App() {
  const dispatch = useDispatch();

  const [route, setRoute] = useState();
  const [injectedProvider, setInjectedProvider] = useState();
  const [chainId, setChainId] = useState();

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, null);
  const address = useUserAddress(userProvider);
  const { pathname } = useLocation();
  // You can warn the user if you would like them to be on a specific network
  // const selectedChainId = userProvider && userProvider._network && userProvider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // Just plug in different 🛰 providers to get your balance on different chains:
  // const yourMainnetBalance = useBalance(mainnetProvider, address);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  // const writeContracts = useContractLoader(userProvider);

  // EXTERNAL CONTRACT EXAMPLE:
  // If you want to bring in the mainnet DAI contract it would look like:
  // const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI);

  // If you want to call a function on a new block
  /* useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  }); */

  async function init() {
    try {
      let provider;
      let addressToLoad;
      if (web3Modal.cachedProvider) {
        provider = await loadWeb3Modal();
        addressToLoad = provider.provider.selectedAddress;
      } else {
        provider = fallbackProvider;
      }
      const networkInfo = await provider.getNetwork();
      setChainId(networkInfo.chainId);
      if (networkInfo.chainId !== 137 && networkInfo.chainId !== 80001) {
        return; // modal will ask for network change -> page will reload
      }
      await dispatch(loadAppDetails({ networkID: networkInfo.chainId, provider }));
      await dispatch(getMarketPrice({ networkID: networkInfo.chainId, provider }));
      await dispatch(getTokenSupply({ networkID: networkInfo.chainId, provider }));

      if (addressToLoad)
        await dispatch(loadAccountDetails({ networkID: networkInfo.chainId, address: addressToLoad, provider }));
      ["klima_bct_lp", "bct_usdc_lp"].map(async bond => {
        // CHECK FOR DEPLOYED ADDRESSES
        if (addresses[networkInfo.chainId].BONDS.OHM_DAI !== "") {
          await dispatch(calcBondDetails({ bond, value: null, provider, networkID: networkInfo.chainId }));
        }
      });
    } catch (e) {
      console.error("failed to init()", e);
      return;
    }
  }

  useEffect(() => {
    init();
  }, []);

  const loadWeb3Modal = async () => {
    const provider = await web3Modal.connect();
    const newProvider = new Web3Provider(provider);
    setInjectedProvider(newProvider); // metamask
    return newProvider;
  };

  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

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

  const isConnected = !!web3Modal && !!web3Modal.cachedProvider && !!injectedProvider;
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
        <button type="button" className={styles.disconnectWalletButton} onClick={logoutOfWeb3Modal}>
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
              <Stake address={address} provider={injectedProvider} isConnected={isConnected} />
            </Route>
            <Route exact path="/redeem">
              <Redeem address={address} provider={injectedProvider} isConnected={isConnected} />
            </Route>
            <Route exact path="/pklima">
              <PKlima address={address} provider={injectedProvider} isConnected={isConnected} />
            </Route>
            <Route exact path="/bonds">
              <ChooseBond address={address} provider={injectedProvider} isConnected={isConnected} />
            </Route>
            {Object.values(BONDS).map(bond => {
              if (bond === "bct") {
                return null; // REMOVE ME when naked bonds launch
              }
              return (
                <Route exact key={bond} path={`/bonds/${bond}`}>
                  <Bond
                    bond={bond}
                    isConnected={isConnected}
                    address={address}
                    provider={injectedProvider}
                    web3Modal={web3Modal}
                    loadWeb3Modal={loadWeb3Modal}
                    logoutOfWeb3Modal={logoutOfWeb3Modal}
                    mainnetProvider={injectedProvider}
                    blockExplorer={blockExplorer}
                    route={route}
                    setRoute={setRoute}
                  />
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
      <InvalidNetworkModal provider={injectedProvider} />
    </>
  );
}

/* eslint-disable */
window.ethereum &&
  window.ethereum.on("chainChanged", chainId => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", accounts => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });
/* eslint-enable */

export default App;
// 