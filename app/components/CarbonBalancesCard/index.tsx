import { Spinner, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import {
  BCTIcon,
  C3TIcon,
  KLIMAIcon,
  MCO2Icon,
  NBOIcon,
  NCTIcon,
  TCO2Icon,
  UBOIcon,
  USDCIcon,
} from "@klimadao/lib/resources";
import { Trans } from "@lingui/macro";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Image, { StaticImageData } from "next/image";
import { useSelector } from "react-redux";
import {
  selectBalances,
  selectLocale,
  selectProjectTokens,
} from "state/selectors";
import * as styles from "./styles";

export const iconMap = {
  ubo: UBOIcon,
  nbo: NBOIcon,
  bct: BCTIcon,
  nct: NCTIcon,
  tco2: TCO2Icon,
  c3t: C3TIcon,
  klima: KLIMAIcon,
  sklima: KLIMAIcon,
  wsklima: KLIMAIcon,
  usdc: USDCIcon,
  mco2: MCO2Icon,
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
  | "usdc" // USDC.e
  | "klima"
  | "bct"
  | "nct"
  | "ubo"
  | "nbo"
  | "mco2"
  | "sklima"
  | "wsklima";

const allTokens: SupportedToken[] = [
  "usdc", // USDC.e
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

  const sortedProjectTokens = Object.keys(projectTokens).sort((a, b) =>
    projectTokens[a].symbol > projectTokens[b].symbol ? 1 : -1
  );

  sortedProjectTokens.forEach((addr) => {
    if (!projectTokens[addr]) return;
    const { symbol, quantity } = projectTokens[addr];
    const formattedBalance = formatTonnes({ amount: quantity, locale });
    const icon = symbol.startsWith("TCO2-") ? TCO2Icon : C3TIcon;
    assetInfo.push({
      assetName: symbol,
      balance: formattedBalance,
      icon,
      address: addr,
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
