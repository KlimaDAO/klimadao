import { Text } from "@klimadao/lib/components";
import { Balance } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { getUSDCBalance } from "lib/actions";
import { formatToPrice } from "lib/formatNumbers";
import { carbonmarkTokenInfoMap } from "lib/getTokenInfo";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as styles from "./styles";

export const Balances: FC = () => {
  const { locale } = useRouter();
  const { address } = useWeb3();
  const [balances, setBalances] = useState<Balance[]>([]);

  const updateBalance = (updatedBalance: Balance) => {
    setBalances((prevState) => {
      const withoutFormerBalance = prevState.filter(
        (b) => b.tokenName !== updatedBalance.tokenName
      );
      return [...withoutFormerBalance, updatedBalance];
    });
  };

  // load USDC
  useEffect(() => {
    if (!address) return;

    const usdcBalance = async () => {
      const usdc = await getUSDCBalance({
        userAddress: address,
      });

      updateBalance({
        tokenName: "usdc",
        balance: formatToPrice(usdc, locale),
      });
    };
    usdcBalance();
  }, [address]);

  return (
    <Card>
      <Text t="h4">
        <Trans id="portfolio.balances.title">Balances</Trans>
      </Text>
      <div className={styles.list}>
        {balances?.length &&
          balances?.map((balance) => (
            <div className={styles.listItem} key={balance.tokenName}>
              <div className={styles.itemWithIcon}>
                <div className="icon">
                  <Image
                    src={carbonmarkTokenInfoMap[balance.tokenName].icon}
                    width={20}
                    height={20}
                    alt={balance.tokenName}
                  />
                </div>
                <Text t="caption">
                  {carbonmarkTokenInfoMap[balance.tokenName].label}
                </Text>
              </div>
              <Text t="caption" className={styles.itemWithIcon}>
                {balance.balance}
              </Text>
            </div>
          ))}
      </div>
    </Card>
  );
};
