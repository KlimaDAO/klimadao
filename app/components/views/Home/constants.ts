export type LoadWeb3Modal = () => Promise<void>;

interface Link {
  to: string;
  show: boolean;
  text: string;
  dataActive: boolean;
}

export interface NavProps {
  links: Link[];
  chainId: number | undefined;
}

export interface WalletProps {
  isMobile?: boolean;
  isConnected: boolean;
  loadWeb3Modal: LoadWeb3Modal;
  disconnect: () => Promise<void>;
}

export interface MobileMenuProps {
  links: Link[];
  isConnected: boolean;
  loadWeb3Modal: LoadWeb3Modal;
  disconnect: () => Promise<void>;
}

export const generateLinks = ({
  path,
  showPklimaButton,
  showRedeemButton,
}: {
  path: string;
  showPklimaButton: boolean;
  showRedeemButton: boolean;
}) => [
  {
    to: "/redeem",
    show: showRedeemButton,
    text: "REDEEM",
    dataActive: path === "/redeem",
  },
  {
    to: "/stake",
    show: true,
    text: "STAKE",
    dataActive: path === "/stake",
  },
  {
    to: "/wrap",
    show: true,
    text: "WRAP",
    dataActive: path === "/wrap",
  },
  {
    to: "/bonds",
    show: true,
    text: "BOND",
    dataActive: path.includes("/bonds"),
  },
  {
    to: "/info",
    show: true,
    text: "INFO",
    dataActive: path === "/info",
  },
  {
    to: "/pklima",
    show: showPklimaButton,
    text: "pKLIMA",
    dataActive: path === "/pklima",
  },
];
