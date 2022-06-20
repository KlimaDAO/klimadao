import { Text } from "@klimadao/lib/components";
import AccountBalanceOutlined from "@mui/icons-material/AccountBalanceOutlined";
import { trimWithPlaceholder } from "@klimadao/lib/utils";
import { useSelector } from "react-redux";
import { InfoButton } from "components/InfoButton";
import { selectAppState, selectBalances, selectLocale } from "state/selectors";
import * as styles from "./styles";
import { FC } from "react";
import { RootState } from "state";
import { t, Trans } from "@lingui/macro";

type Asset = keyof NonNullable<RootState["user"]["balance"]>;
type AssetLabels = { [key in Asset]: string };

interface Props {
  assets: Asset[];
  tooltip: React.ReactNode;
}

export const BalancesCard: FC<Props> = (props) => {
  const { currentIndex } = useSelector(selectAppState);
  const balances = useSelector(selectBalances);
  const locale = useSelector(selectLocale);

  const labels: AssetLabels = {
    bct: "BCT",
    klima: "KLIMA",
    pklima: "pKLIMA",
    sklima: "sKLIMA",
    wsklima: "wsKLIMA",
    wsklimaUnwrapped:
      "wsKLIMA (" +
      t({ id: "wsklima.unwrapped.label", message: "unwrapped" }) +
      ")",
    mco2: "MCO2",
    usdc: "USDC",
    nct: "NCT",
    ubo: "UBO",
    nbo: "NBO",
  };

  return (
    <div className={styles.card + " " + status}>
      <div className="header">
        <Text t="h4" className="title">
          <AccountBalanceOutlined />
          <Trans id="shared.balances">Balances</Trans>
        </Text>
        <InfoButton content={props.tooltip} />
      </div>
      <div className="cardContent">
        {props.assets.map((asset) => (
          <div className="stack" key={asset}>
            {asset !== "wsklimaUnwrapped" && (
              <Text className="value">
                {trimWithPlaceholder(balances?.[asset] ?? 0, 9, locale)}
              </Text>
            )}
            {asset === "wsklimaUnwrapped" && balances && currentIndex && (
              <Text className="value">
                {trimWithPlaceholder(
                  Number(balances["wsklima"]) * Number(currentIndex) ?? 0,
                  9,
                  locale
                )}
              </Text>
            )}
            <Text className="label" color="lightest">
              {labels[asset]}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
