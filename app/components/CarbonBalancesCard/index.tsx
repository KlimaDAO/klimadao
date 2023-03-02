import { Spinner, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { Trans } from "@lingui/macro";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Image, { StaticImageData } from "next/image";
import BCT from "public/icons/BCT.png";
import C3T from "public/icons/C3T.png";
import KLIMA from "public/icons/KLIMA.png";
import MCO2 from "public/icons/MCO2.png";
import NBO from "public/icons/NBO.png";
import NCT from "public/icons/NCT.png";
import TCO2 from "public/icons/TCO2.png";
import UBO from "public/icons/UBO.png";
import USDC from "public/icons/USDC.png";
import { useSelector } from "react-redux";
import {
  selectBalances,
  selectLocale,
  selectProjectTokens,
} from "state/selectors";
import * as styles from "./styles";

export const iconMap = {
  ubo: UBO,
  nbo: NBO,
  bct: BCT,
  nct: NCT,
  tco2: TCO2,
  c3t: C3T,
  klima: KLIMA,
  sklima: KLIMA,
  wsklima: KLIMA,
  usdc: USDC,
  mco2: MCO2,
};

/**
 * Round to 2nd decimal place, to localized string.
 * If the rounded value is smaller than 0.01, return 0
 * Trims trailing zeros.
 * "1000.12567" => "1,000.13"
 * "1000.000" => "1,000"
 * "0.00999" => "0"
 */
const formatTonnes = (params: { amount: string; locale: string }): string => {
  const amountNumber = Number(params.amount);
  if (amountNumber < 0.01) return "0";
  return amountNumber.toLocaleString(params.locale, {
    maximumFractionDigits: 2,
  });
};

interface Asset {
  assetName: string;
  balance: string;
  icon: StaticImageData;
  address?: string;
}

type SupportedToken =
  | "usdc"
  | "klima"
  | "bct"
  | "nct"
  | "ubo"
  | "nbo"
  | "mco2"
  | "sklima"
  | "wsklima";

const allTokens: SupportedToken[] = [
  "usdc",
  "klima",
  "sklima",
  "wsklima",
  "bct",
  "nct",
  "ubo",
  "nbo",
  "mco2",
];

export const CarbonBalancesCard = (props: {
  isConnected?: boolean;
  tokensToShow?: SupportedToken[];
}) => {
  const { tokensToShow = allTokens } = props;
  const locale = useSelector(selectLocale) || "en";
  const balances = useSelector(selectBalances);
  const projectTokens = useSelector(selectProjectTokens);

  const assetInfo = tokensToShow.reduce<Asset[]>((prev, tkn) => {
    const amount = balances?.[tkn] || "0";
    if (Number(amount) < 0.01) return prev;
    const balance = formatTonnes({ amount, locale });
    const assetName = tkn.toUpperCase();
    return [...prev, { assetName, balance, icon: iconMap[tkn] }];
  }, []);

  Object.keys(projectTokens).forEach((address) => {
    const { symbol, quantity } = projectTokens[address];
    const formattedBalance = formatTonnes({ amount: quantity, locale });
    const icon = symbol.startsWith("TCO2-") ? TCO2 : C3T;
    assetInfo.push({
      assetName: symbol,
      balance: formattedBalance,
      icon,
      address,
    });
  });

  const isLoading = props.isConnected && !balances;

  return (
    <div className={styles.card}>
      <Text t="h4" className="cardTitle">
        <AccountBalanceWalletIcon />
        <Trans>Balances</Trans>
      </Text>
      <div className="cardContent">
        {!props.isConnected && (
          <Text t="button" color="lighter">
            <Trans>Not Connected</Trans>
          </Text>
        )}
        {isLoading && (
          <div className="loadingPlaceholder">
            <Spinner />
            <Text t="button" color="lighter">
              <Trans>Loading balances...</Trans>
            </Text>
          </div>
        )}
        {props.isConnected &&
          !isLoading &&
          assetInfo.map((asset) => (
            <div className="assetEntry" key={asset.assetName}>
              <Image src={asset.icon} width={32} height={32} alt="" />
              <div className="assetEntryLabel">
                <Text>{asset.balance}</Text>
                <Text t="caption" uppercase color="lightest">
                  {asset.assetName}
                </Text>
                {asset?.address && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${urls.polygonscan}/token/${asset.address}`}
                    className="hyperlinkIcon"
                  >
                    <OpenInNewIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        {props.isConnected && !isLoading && !assetInfo.length && (
          <div className="emptyBalancesPlaceholder">
            <Text t="button">
              <Trans>No balances found.</Trans>
            </Text>
            <Text t="caption" color="lightest">
              <Trans>
                You need to load your wallet with USDC, KLIMA or a carbon pool
                token. Credit card support is coming soon.
              </Trans>
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
