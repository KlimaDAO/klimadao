import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
import { urls } from "../../constants";
import { Web3ModalStrings } from "../../components/Web3Context/types";

/** NOTE: only invoke client-side */
const createLazyWeb3Modal = async (
  strings: Web3ModalStrings
): Promise<Web3Modal> => {
  // BUG: @klimadao/lib transpilation does not properly re-export the Web3Modal or coinbase libraries, probably because we don't use babel in here.
  // Babel automatically adds a default export for interoperability reasons, which is why this isn't a problem in /site and /app (nextjs uses babel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const untypedWeb3Modal = Web3Modal as any;
  const untypedCoinbase = CoinbaseWalletSDK as any;
  const TypedWeb3Modal = untypedWeb3Modal.default as typeof Web3Modal;
  const TypedCoinbaseWallet =
    untypedCoinbase.default as typeof CoinbaseWalletSDK;
  return new TypedWeb3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: { 137: urls.polygonMainnetRpc },
        },
        display: {
          description: strings.walletconnect_desc,
        },
      },
      coinbasewallet: {
        package: TypedCoinbaseWallet, // Required
        options: {
          appName: "KlimaDAO App", // Required
          rpc: urls.polygonMainnetRpc, // Optional if `infuraId` is provided; otherwise it's required
          chainId: 137, // Optional. It defaults to 1 if not provided
          darkMode: false, // Optional. Use dark theme, defaults to false
        },
      },
      injected: {
        display: {
          description: strings.injected_desc,
        },
        package: null,
      },
      torus: {
        package: Torus,
        options: {
          networkParams: {
            host: "matic", // optional
            chainId: 137,
            networkName: "Polygon",
          },
          config: {
            buildEnv: "production",
            showTorusButton: false,
          },
        },
        display: {
          name: strings.torus_name,
          description: strings.torus_desc,
          // Taken from https://mui.com/material-ui/material-icons/?query=email&selected=MailOutline
          logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-10cscxr' focusable='false' aria-hidden='true' viewBox='0 0 24 24' data-testid='MailOutlineIcon'%3E%3Cpath stroke-width='.1' stroke='%23999999' fill='%23999999' d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'%3E%3C/path%3E%3C/svg%3E",
        },
      },
    },
  });
};

export default createLazyWeb3Modal;
