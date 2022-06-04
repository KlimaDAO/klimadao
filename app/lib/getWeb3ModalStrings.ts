import { t } from "@lingui/macro";

/** Identical to site/lib/getWeb3ModalStrings because we can't use lingui in @klimadao/lib */
export const getWeb3ModalStrings = () => ({
  walletconnect_desc: t({
    id: "web3modal.walletconnect.desc",
    message: "Scan with WalletConnect to connect",
  }),
  coinbase_desc: t({
    id: "web3modal.walletlink.desc",
    message: "Scan with Coinbase to connect",
  }),
  injected_desc: t({
    id: "web3modal.injected.des",
    message: "Connect with your browser web3 provider",
  }),
  torus_name: t({
    id: "web3modal.torus.name",
    message: "Email or Social",
  }),
  torus_desc: t({
    id: "web3modal.torus.desc",
    message: "Easy one-click wallet by Torus",
  }),
});
